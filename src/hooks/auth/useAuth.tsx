import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeUser } from "../../store/auth/authSlice"
import { User, UserCredentials } from "../../types/auth.types"
import { SigInService } from "../../services/authService"

export const useAuth = () => {
  // Hooks
  const dispatch = useDispatch()
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sigIng = async (userCreds: UserCredentials) => {
    setIsLoading(true)

    SigInService(userCreds).then((result) => {
      if(typeof(result) === 'object') {
        const user: User = {
          uid: result.uid,
          displayName: result.displayName,
          email: result.email,
          emailVerified: result.emailVerified,
          phoneNumber: result.phoneNumber,
          photoUrl: result.photoURL,
          isLogged: true,
        }
        dispatch(changeUser(user))
      } else {
        window.alert('Erro ao logar')
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setIsLoading(false)
    })

  }

  return {
    sigIng,
    isLoading,
    setIsLoading
  }
}