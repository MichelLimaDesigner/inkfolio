import { AddFour, Calendar, Close, HamburgerButton, Home, Logout, Message, Search, TipsOne } from '@icon-park/react'
import { Modal, ModalBody, ModalContent, ModalHeader, Skeleton, Tooltip, User, useDisclosure } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import PostContainer from '../presentation/containers/post/Posts.container'
import InkFolioLogo from '/logos/InkFolio-black.png'
import { useState } from 'react'
import useProfile from '../services/useProfile'
import useAuth from '../services/useAuth'

const SidebarMenu: React.FC = () => {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Hooks
  const { user, isLoading, userSignOut } = useAuth()
  const {profile} = useProfile()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const closeModal = () => {
    onOpenChange()
  }

  if(isLoading) {
    return (
      <div className='w-full h-screen border-r border-gray-50 shadow-xl bg-white pt-8'>
        <ul className='px-4 flex flex-col gap-8'>
          <div className='flex gap-3'>
            <Skeleton className='h-10 w-10 rounded-full'/>
            <Skeleton className='h-10 w-44 rounded'/>
          </div>
          <Skeleton className='h-10 w-44 rounded'/>
          <Skeleton className='h-10 w-44 rounded'/>
          <Skeleton className='h-10 w-44 rounded'/>
          <Skeleton className='h-10 w-44 rounded'/>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div
        className='flex sm:hidden bg-tertiary absolute p-2 z-50 cursor-pointer'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <Close theme="outline" size="24" fill="#fff" strokeWidth={3}/>
        ) : (
          <HamburgerButton theme='outline' size='24' fill='white' strokeWidth={3}/>
        )}
      </div>

      <nav
        className={`${isMenuOpen ? 'flex absolute z-40 ' : 'hidden ' } sm:flex flex-col w-full h-screen border-r border-gray-50 shadow-xl bg-white`}
      >
        <div className='w-full py-8 flex justify-center'>
          <Link to='/' >
            <img src={InkFolioLogo} alt='InkFolio' className='w-36'/>
          </Link>
        </div>
        <ul className='px-4 flex flex-col gap-4'>
          <Link to='/perfil' className='pl-4'>
            <User
              name={profile.name || user.email}
              avatarProps={{
                src: profile?.avatar || ''
              }}
            />
          </Link>
          <Link to='/'>
            <li className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200'>
              <Home theme='outline' size='24' fill='#333' strokeWidth={3}/>
              Página incial
            </li>
          </Link>
          <Link to='/configuracao-de-mensagens'>
            <Tooltip content='Gerenciar Mensagens' color='primary' placement={'right-end'}>
              <li className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200'>
                <Message theme='outline' size='24' fill='#333' strokeWidth={3}/>
                  Mensagens
              </li>
            </Tooltip>
          </Link>
          <Link to='/' className='hidden'>
            <Tooltip content='Em breve' color='primary' placement={'right-end'}>
              <li className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200'>
                <Calendar theme='outline' size='24' fill='#333' strokeWidth={3}/>
                  Agenda
              </li>
            </Tooltip>
          </Link>
          <li
            className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200 cursor-pointer'
            onClick={onOpen}
          >
            <AddFour theme='outline' size='24' fill='#333' strokeWidth={3}/>
            Criar
          </li>
          <Link to='/' className='hidden'>
            <Tooltip content='Em breve' color='primary' placement={'right-end'}>
              <li className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200'>
                <TipsOne theme='outline' size='24' fill='#333' strokeWidth={3}/>
                  Notificações
              </li>
            </Tooltip>
          </Link>
          <Link to='/' className='hidden'>
            <Tooltip content='Em breve' color='primary' placement={'right-end'}>
              <li className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200'>
                <Search theme='outline' size='24' fill='#333' strokeWidth={3}/>
                  Pesquisar
              </li>
            </Tooltip>
          </Link>
          <div onClick={userSignOut} className='cursor-pointer'>
            <li className='flex gap-4 h-11 items-center rounded-lg pl-4 hover:bg-gray-100 ease-linear duration-200'>
              <Logout theme='outline' size='24' fill='#333' strokeWidth={3}/>
                Sair
            </li>
          </div>
        </ul>
      </nav>

      <Modal
        backdrop='blur' 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        // size='xl'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Criar nova postagem</ModalHeader>
              <ModalBody>
                <PostContainer closeModal={closeModal}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SidebarMenu