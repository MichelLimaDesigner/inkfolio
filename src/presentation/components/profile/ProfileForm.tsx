import { Input, Textarea } from '@nextui-org/input'
import InkFolio from '/img/InkFolio.png'
import { Select, SelectItem } from '@nextui-org/select'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { IProfile } from '../../../types/profile.types'
import { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import tattooStyles from '../../../assets/data/tattooStyles'

interface IForm {
  isLoading: boolean
  formValues: IProfile
  previewFiles: string[]
  handleFiles: (files: FileList | null) => void
  handleInputChange: (fieldName: string, value: string) => void
  submitProfile: (profile: IProfile, isEditing?: boolean) => void
}

const ProfileForm: React.FC<IForm> = ({
  formValues,
  isLoading,
  previewFiles,
  handleFiles,
  handleInputChange,
  submitProfile
}) => {
  // Hooks
  const location = useLocation()
  const image = previewFiles.length > 0 ? previewFiles[0] : formValues.avatar || ''

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitProfile(formValues, Boolean(location.pathname.includes('edit')))
  }

  return(
    <form
      className='w-full max-w-[500px] mx-auto p-4 rounded-lg shadow-lg bg-white flex flex-col gap-4'
      onSubmit={onSubmit}
    >
      <img
        src={InkFolio}
        className='text-center my-8 mx-auto'
      />

      <div>
        <Avatar src={image} className="w-24 h-24 mx-auto text-large" />
        <label htmlFor="avatar" className='block text-center my-4 text-primary underline cursor-pointer'>
          Selecionar foto de perfil
        </label>
      </div>

      <input
        type="file"
        name="avatar"
        id="avatar"
        className='hidden'
        onChange={(e) => handleFiles(e.target.files)}
        />

      <Input
        isRequired
        type='text'
        name='name'
        label='Nome'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.name}
      />
      <Input
        isRequired
        type='text'
        name='phone'
        label='Celular (whastsapp - somente números)'
        maxLength={11}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.phone}
      />
      <Textarea
        isRequired
        type='text'
        name='bio'
        label='Bio'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.bio}
        />
      <Select
        isRequired
        name='tattoo_styles'
        label='Estilos de tatuagem'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        selectionMode="multiple"
        selectedKeys={formValues?.tattoo_styles?.split(',')}
      >
        {tattooStyles.map((style) => (
          <SelectItem key={style.value} value={style.value}>
            {style.name}
          </SelectItem>
        ))}
      </Select>
      <Input
        type='text'
        name='profile_url'
        label='Escreva o endereço URL que terá seu perfil'
        onChange={(e) => handleInputChange(e.target.name, e.target.value.split(' ').join('-'))}
        value={formValues.profile_url}
      />
      <Input
        isRequired
        type='text'
        name='address.street'
        label='Endereço do estúdio'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.street}
      />
      <Input
        isRequired
        type='number'
        name='address.number'
        label='Número'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.number}
      />
      <Input
        isRequired
        type='text'
        name='address.city'
        label='Cidade'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.city}
      />
      <Input
        type='text'
        name='address.state'
        label='Estado'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.address.state}
      />
      <Input
        type='text'
        name='redes.instagram'
        label='Instagram'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.instagram}
      />
      <Input
        type='text'
        name='redes.facebook'
        label='Facebook'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.facebook}
      />
      <Input
        type='text'
        name='redes.pinterest'
        label='Pinterest'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.pinterest}
      />
      <Input
        type='text'
        name='redes.youtube'
        label='Youtube'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.youtube}
      />
      <Input
        type='text'
        name='redes.linkedin'
        label='Linkedin'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.linkedin}
      />
      <Input
        type='text'
        name='redes.behance'
        label='Behance'
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        value={formValues.redes?.behance}
      />
      <Button color='primary' size='lg' type='submit' isLoading={isLoading}>
        Salvar
      </Button>
    </form>
  )
}

export default ProfileForm