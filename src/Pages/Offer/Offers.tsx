import React, { useEffect, useState, useMemo } from 'react';
import { Box, Divider, Avatar, SelectChangeEvent, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select,MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../../Components/Layout';
import WorkIcon from '@mui/icons-material/Work';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AllOffers() {
    const navigate = useNavigate()
  
    const [results, setResults] = useState([])
  
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [count, setCount] = useState(0)
  
    const [sortType, setSortType] = useState<string>('DESC')
    const [location, setLocation] = useState<string>('')
  
    const handleSortTypeChange = (event: SelectChangeEvent<string>) => {
      setSortType(event.target.value as string)
    }
    const handleLocationChange = (event: SelectChangeEvent<string>) => {
      setLocation(event.target.value as string)
    }
    const getAllResults = async () => {
      try {
        const accessToken = localStorage.getItem('token')
  
        const res = await axios.get(
          (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
            '/api/announcements/sorted/' +
            (location !== '' ? location + '/' : '') +
            sortType,
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
  
    useEffect(() => {
      getAllResults()
    }, [sortType, location])
  
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
  
    const handleClickAvatar = (
      e: React.MouseEvent<HTMLDivElement>,
      userId: number
    ) => {
      e.stopPropagation()
      navigate('/profile/' + userId)
    }
  
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
          <Box sx={{ p: '2vh', fontSize: 40, color: '#9f50ff' }}>
            <h2 className="tracking-wider text-[#bbd5d8]">
              Aktualna lista ogłoszeń
            </h2>
            <Divider orientation="horizontal" sx={{ mt: '4px' }} />
  
            <Paper sx={{ p: '2vh' }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}
              >
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="sort-type-label">Sortuj po dacie</InputLabel>
                  <Select
                    labelId="sort-type-label"
                    id="sort-type"
                    value={sortType}
                    onChange={handleSortTypeChange}
                  >
                    <MenuItem value="DESC">Od najnowszych</MenuItem>
                    <MenuItem value="ASC">Od najstarszych</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 200, marginLeft: 16 }}>
                  <InputLabel id="location-label">
                    Filtruj po lokalizacji
                  </InputLabel>
                  <Select
                    labelId="location-label"
                    id="location"
                    value={location}
                    onChange={handleLocationChange}
                  >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {locations.map((loc, index) => (
                      <MenuItem key={index} value={loc}>
                        {loc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
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
                        <TableCell>
                          {row.createdAt.slice(0, 10) +
                            ' ' +
                            row.createdAt.slice(11, 16)}
                        </TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>
                          <div
                            className="text-[20px] flex gap-2 hover:text-red-500 "
                            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                              handleClickAvatar(e, row.user.id)
                            }
                          >
                            <div>
                              <AccountCircleIcon sx={{ fontSize: 40 }} />
                            </div>
                            <div className="flex items-center">
                              {row.user.username}
                            </div>
                          </div>
                        </TableCell>
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
          </Box>
        </Layout>
      </Box>
    )
  }
  