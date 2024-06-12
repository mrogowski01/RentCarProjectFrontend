import { Box, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SyncIcon from '@mui/icons-material/Sync'
import axios from 'axios'
import { Announcement as AnnouncementType } from './User/List/List'

import { Layout } from '../Components/Layout'
export default function Announcement() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [announcement, setAnnouncement] = useState<AnnouncementType | null>()
  const [dateFormat, setDateFormat] = useState<string>('')

  const [ready, setReady] = useState<boolean>(false)

  const handleClick = () => {
    navigate('/results')
  }

  const getAnnouncement = async () => {
    try {
      const accessToken = localStorage.getItem('token')

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/announcements/' +
          id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setAnnouncement(res.data)
        setDateFormat(res.data.createdAt.substr(0, 10))
        setReady(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAnnouncement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      display="flex"
      sx={{ flexGrow: 1 }}
      height="100vh"
      overflow="hidden"
      flexDirection="row"
    >
      <Layout>
        <Box
          sx={{
            p: '2vh',
            fontSize: 40,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {ready && announcement ? (
            <>
              <div className="grid grid-cols-2">
                <div className="text-[#bbd5d8] text-[60px]">
                  {announcement.title}
                </div>
                <div className="text-right text-[30px]">{dateFormat}</div>
              </div>
              <div>
                <Divider
                  orientation="horizontal"
                  sx={{ mt: '4px', mb: '10px' }}
                />
              </div>
              <div>
                <p className="mb-10">{announcement.type}</p>
                <p>{announcement.description}</p>
              </div>
              <div className="mt-10">
                <button
                  className="bg-[#bbd5d8] p-2.5 mb-10 rounded"
                  onClick={handleClick}
                >
                  Powrót
                </button>
              </div>
            </>
          ) : (
            <div className="absolute top-1/2 left-1/2 grid gap-5 -translate-x-1/2 -translate-y-1/2 place-items-center align-middle">
              <SyncIcon />
            </div>
          )}
        </Box>
      </Layout>
    </Box>
  )
}
