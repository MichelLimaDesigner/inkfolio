import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUser, logout, selectUser } from "../../store/auth/authSlice"
import { UserData, UserCredentials, UserFormValues } from "../../types/auth.types"
import { GetUserService, SigInService, SigUpService, SignOutService } from "../../services/authService"
import Cookies from 'js-cookie';
import { getProfile } from "../../services/profileService"
import { changeProfile, removeProfile } from "../../store/profile/profileSlice"
import { useNavigate } from "react-router-dom"
import useProfile from "../profile/useProfile"

export const useAuth = () => {
  // Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {getUserProfile} = useProfile()
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector(selectUser)
  const token = Cookies.get('token')

  // Função assíncrona para buscar os dados do usuário
  const fetchUserData = useCallback(async () => {
    if(!user.uid) {
      setIsLoading(true)
      await GetUserService().then(async (res) => {
        if (token && res) {
          const userData: UserData = {
            uid: res.uid,
            displayName: res.displayName,
            email: res.email,
            emailVerified: res.emailVerified,
            phoneNumber: res.phoneNumber,
            photoUrl: res.photoURL,
            isLogged: true,
          }
          const profileData = await getProfile(userData.uid)
          if(profileData) {
            dispatch(changeProfile(profileData))
            dispatch(changeUser(userData))
          }
          else {
            navigate('/completar-cadastro')
            dispatch(changeUser(userData))
          }
        } else {
          console.log('Usuário não autenticado.');
        }
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }, [user.uid])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const sigIn = async (userCreds: UserCredentials) => {
    setIsLoading(true)

    await SigInService(userCreds).then( async (result) => {
      if(typeof(result) === 'object') {
        const user: UserData = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          emailVerified: result.user.emailVerified,
          phoneNumber: result.user.phoneNumber,
          photoUrl: result.user.photoURL,
          isLogged: true,
        }
        await getUserProfile(result.user.uid)
        const token = result.token
        Cookies.set('token', token, { expires: 7 })
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

  const sigUp = async (userCreds: UserFormValues) => {
    setIsLoading(true)

    await SigUpService(userCreds).then((result) => {
      if(typeof(result) === 'object') {
        const user: UserData = {
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

  const signOut = async () => {
    setIsLoading(true)

    await SignOutService().then((result) => {
      if(result) {
        navigate('/')
        dispatch(logout())
        dispatch(removeProfile())
        Cookies.remove('token')
      } else {
        window.alert('Erro ao deslogar')
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return {
    user,
    sigIn,
    sigUp,
    signOut,
    isLoading,
  }
}