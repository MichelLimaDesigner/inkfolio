import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Tooltip, User } from '@nextui-org/react'
import InkFolioLogo from '/logos/InkFolio-white.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import useProfile from '../services/useProfile';
import useAuth from '../services/useAuth';

const Menu: React.FC = () => {
  // Hooks
  const {user, userSignOut} = useAuth()
  const {profile} = useProfile()
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await userSignOut()
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-black text-white' >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link to='/'>
            <img src={InkFolioLogo} alt="InkFolio" className='w-28'/>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:hidden gap-4' justify='center'>
        <NavbarItem>
          <Link to='/'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Tooltip content='Em breve' color='danger'>
            <Link to='/'>
              O que é o InkFolio
            </Link>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <Tooltip content='Em breve' color='danger'>
            <Link to='/'>
              Equipe
            </Link>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        {
          user?.isLogged ? (
            <NavbarItem>
              <Link to='/perfil'>
                <Button color='primary' variant='flat' size='lg'>
                  <User   
                    name={profile.name ?? 'Completar cadastro'}
                    avatarProps={{
                      src: profile.avatar ?? ""
                    }}
                  />
                </Button>
              </Link>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem className='hidden lg:flex'>
                <Link to='/login'>Entrar</Link>
              </NavbarItem>
              <NavbarItem>
                <Link to='/cadastro'>
                  <Button color='primary' variant='flat'>
                    Cadastrar-se
                  </Button>
                </Link>
              </NavbarItem>
            </>
          )
        }
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem >
          <Link to='/'> Home </Link>
        </NavbarItem>
          {
            user.isLogged ? (
              <>
                <NavbarItem >
                  <Link to='/'> Perfil </Link>
                </NavbarItem>
                <NavbarItem onClick={handleLogout}>
                  <Button variant='light'> Sair </Button>
                </NavbarItem>
              </>
            ) : (
              <>
                <NavbarItem >
                  <Link to='/login'> Entrar </Link>
                </NavbarItem>
                <NavbarItem >
                  <Link to='/cadastro'> Criar conta </Link>
                </NavbarItem>
              </>
            )
          }
      </NavbarMenu>
    </Navbar> 
  )
}

export default Menu