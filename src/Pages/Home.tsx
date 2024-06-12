import { Box, Divider } from '@mui/material'
import { Navbar } from '../Components/Navbar'
import { Layout } from '../Components/Layout'

export default function Home() {
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
      <Layout></Layout>
    </Box>
  )
}
