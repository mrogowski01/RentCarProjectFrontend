import { Box, Divider } from '@mui/material'
import { Navbar } from '../Components/Navbar'
import { Layout } from '../Components/Layout'
import { useContext } from 'react'
import { authContext, TauthContext } from '../Context/AuthContext'

export default function Landing() {
  const { username } = useContext(authContext) as TauthContext

  return (
    <Box
      display="flex"
      sx={{ flexGrow: 1 }}
      height="100vh"
      overflow="hidden"
      flexDirection="column"
    >
      <Navbar />
      <Divider
        light
        orientation="horizontal"
        sx={{ mt: '6px', background: 'rgb(209 213 219)' }}
      />
      <Layout>
        <Box sx={{ p: '2vh', fontSize: 40 }}>
          <h2 className="tracking-wider ">Witaj {username}</h2>
          <Divider orientation="horizontal" sx={{ mt: '4px' }} />
        </Box>
      </Layout>
    </Box>
  )
}
