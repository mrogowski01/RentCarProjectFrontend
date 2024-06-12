import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import SyncIcon from '@mui/icons-material/Sync'
import axios from 'axios'
import { User, Announcement } from './User/List/List'
import { Box, Divider, Avatar, Paper } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import WorkIcon from '@mui/icons-material/Work'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import InfoIcon from '@mui/icons-material/Info'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Layout } from '../Components/Layout'

export default function UserPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [user, setUser] = useState<User | null>()
  const [ready, setReady] = useState<boolean>(false)

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [count, setCount] = useState<number>(0)

  const [results, setResults] = useState([])

  const [followed, setFollowed] = useState<boolean>(false)

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem('token')

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/users/' +
          id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setUser(res.data)
        setReady(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getAllResults = async () => {
    try {
      const accessToken = localStorage.getItem('token')
      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/announcements/user/' +
          id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setResults(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getFollowed = async () => {
    try {
      const myId = localStorage.getItem('id')
      const accessToken = localStorage.getItem('token')

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/users/' +
          myId +
          '/following/' +
          id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setFollowed(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const follow = async () => {
    try {
      const myId = localStorage.getItem('id')
      const accessToken = localStorage.getItem('token')

      const dataJson = JSON.stringify({
        followerId: myId,
        followedId: id
      })

      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/users/follow',
        dataJson,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setFollowed(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const unfollow = async () => {
    try {
      const myId = localStorage.getItem('id')
      const accessToken = localStorage.getItem('token')

      const dataJson = JSON.stringify({
        followerId: myId,
        followedId: id
      })

      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/users/unfollow',
        dataJson,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setFollowed(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
    getAllResults()
    getFollowed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (results) {
      setCount(results.length)
    }
  }, [results])

  const visibleRows = useMemo(
    () => results?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, results]
  )

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClick = (announcementId: number) => {
    navigate('/announcement/' + announcementId)
  }

  const handleBack = () => {
    navigate('/results')
  }

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
        ></Box>
        {ready ? (
          <>
            <div className="text-[#bbd5d8] text-[40px]">
              <h2>Profil użytkownika {user?.username}</h2>
            </div>
            <div>
              <Divider
                orientation="horizontal"
                sx={{ mt: '4px', mb: '10px' }}
              />
            </div>
            <div className="m-5">
              {followed ? (
                <button
                  className="bg-[#bbd5d8] p-2.5 rounded"
                  onClick={unfollow}
                >
                  Przestań obserwować
                </button>
              ) : (
                <button className="bg-[#bbd5d8] p-2.5 rounded" onClick={follow}>
                  Obserwuj
                </button>
              )}
            </div>
            <div className="text-[20px] m-3">
              <p>Dostępne aukcje użytkownika</p>
            </div>
            <Paper>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableBody>
                    {visibleRows?.map((row: Announcement, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleClick(row.id)}
                        className="cursor-pointer hover:bg-[#bbd5d8]"
                      >
                        <TableCell>
                          <Avatar>
                            {
                              {
                                JOB: <WorkIcon />,
                                INFORMATION: <InfoIcon />,
                                OFFER: <LocalOfferIcon />
                              }[row.type]
                            }
                          </Avatar>
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={count || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <button
              type="button"
              className="bg-[#bbd5d8] p-2.5 mt-10 rounded"
              onClick={handleBack}
            >
              Powrót
            </button>
          </>
        ) : (
          <>
            <button onClick={handleBack}>
              <ArrowBackIosIcon />
            </button>
            <div className="absolute top-1/2 left-1/2 grid gap-5 -translate-x-1/2 -translate-y-1/2 place-items-center align-middle">
              <SyncIcon />
            </div>
          </>
        )}
      </Layout>
    </Box>
  )
}
