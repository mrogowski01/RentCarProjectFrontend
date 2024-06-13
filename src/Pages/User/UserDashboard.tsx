import { Box, Divider } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Add } from './Add/Add'
import { AddOffer } from './Add/AddOffer'
import { AddReservation } from './Add/AddReservation'
import { Show } from './Show/Show'
import { ShowOffers } from './Show/ShowOffers'
import { Navbar } from '../../Components/Navbar'
import { Layout } from '../../Components/Layout'
import { Sidebar } from '../../Components/Sidebar'

const sidebarElementsDashboard = [
  { label: 'My cars', to: '/userdashboard/show' },
  { label: 'My offers', to: '/userdashboard/showOffers' },
  { label: 'Add car', to: '/userdashboard/add' },
  { label: 'Add offer', to: '/userdashboard/addOffer' },
  { label: 'Add reservation', to: '/userdashboard/addReservation' }

]

export const UserDashboard = () => {
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
      <Layout sidebar={<Sidebar elements={sidebarElementsDashboard} />}>
        {action === 'add' ? <Add /> : <></>}
        {action === 'addOffer' ? <AddOffer /> : <></>}
        {action === 'addReservation' ? <AddReservation /> : <></>}
        {action === 'show' ? <Show /> : <></>}
        {action === 'showOffers' ? <ShowOffers /> : <></>}
      </Layout>
    </Box>
  )
}
