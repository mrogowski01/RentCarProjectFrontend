import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Logout from '@mui/icons-material/Logout'

const props = {
  pages: [
    {
      name: 'Przeglądaj',
      navigate: '/results'
    },
    {
      name: 'All cars',
      navigate: '/cars'
    },
    {
      name: 'All offers',
      navigate: '/offers'
    },
    {
      name: 'User dashboard',
      navigate: '/userdashboard/show'
    }
  ]
}

export const Navbar = () => {
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    localStorage.removeItem('token')
    navigate('/login')
  }

  const NavbarPages = props
  const renderTabs = () =>
    NavbarPages?.pages.map((el, index) => (
      <div
        onClick={() => navigate(el.navigate)}
        className={clsx(
          'rounded-md p-2 px-5 text-xl font-normal tracking-wider cursor-pointer',
          window.location.pathname === el.navigate && 'bg-[#bbd5d8] '
        )}
        key={index}
      >
        {el.name}
      </div>
    ))

  return (
    <nav className="mt-[10px]  flex h-[8vh] min-h-[3.5rem]">
      <div className="flex grow flex-row items-center  text-3xl mx-[2vh] rounded-[1vh] bg-[#eee3e2]">
        <div className="mr-auto ml-20 flex flex-row gap-5 text-xl ">
          {renderTabs()}
        </div>
        <div onClick={handleClick} className="h-[5hv] pr-5 ">
          <Logout
            className="cursor-pointer hover:text-[#bbd5d8]"
            sx={{ fontSize: '45px', color: '[#bbd5d8]' }}
          />
        </div>
      </div>
    </nav>
  )
}
