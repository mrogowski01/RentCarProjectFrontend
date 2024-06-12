import { Box, Divider } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Create } from './Create/Create'
import { List } from './List/List'
import { Navbar } from '../../Components/Navbar'
import { Layout } from '../../Components/Layout'
import { Sidebar } from '../../Components/Sidebar'

const sidebarElements = [
  { label: 'Moje ogłoszenia', to: '/user/list' },
  { label: 'Stwórz nowe', to: '/user/create' }
]

export const User = () => {
  const { action } = useParams()
  return (
    <Box
      display="flex"
      sx={{ flexGrow: 1 }}
      height="100%"
      overflow="hidden"
      flexDirection="column"
    >
      <Navbar />
      <Divider orientation="horizontal" sx={{ mt: '4px' }} />
      <Layout sidebar={<Sidebar elements={sidebarElements} />}>
        {action === 'create' ? <Create /> : <></>}
        {action === 'list' ? <List /> : <></>}
      </Layout>
    </Box>
  )
}
