import React, { useEffect, useState, useMemo } from 'react';
import { Box, Select, MenuItem, FormControl, Divider, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Components/Layout';
import WorkIcon from '@mui/icons-material/Work';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Navbar } from '../../Components/Navbar'
import axios from 'axios'

export default function Show() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [selectedId, setSelectedId] = useState<number>(-1);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
  
    const getAllResults = async () => {
      try {
        const accessToken = localStorage.getItem('token');
  
        const res = await axios.get(
          (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/cars',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        if (res) {
          setResults(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const deleteOne = async (carId: number) => {
      try {
        const accessToken = localStorage.getItem('token');
  
        const res = await axios.delete(
          (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/cars/' + carId,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        if (res) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleDeleteAlert = (id: number) => {
      setSelectedId(id);
      setOpen(true);
    };
  
    const handleCloseDelete = () => {
      deleteOne(selectedId);
      setOpen(false);
    };
  
    const handleCloseCancel = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      getAllResults();
    }, []);
  
    useEffect(() => {
      if (results) {
        setCount(results.length);
      }
    }, [results]);
  
    const visibleRows = useMemo(
      () => results?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [page, rowsPerPage, results]
    );
  
    const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const editOne = (carId: number) => {
      navigate('/edit/' + carId);
    };
  
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
            <h2 className="tracking-wider text-[#bbd5d8]">Cars for rent</h2>
            <Divider orientation="horizontal" sx={{ mt: '2px' }} />
  
            <Paper>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Production year</TableCell>
                      <TableCell>Engine</TableCell>
                      <TableCell>Fuel</TableCell>
                      <TableCell>Color</TableCell>
                      <TableCell>Gearbox</TableCell>
                      {/* <TableCell>Price</TableCell> */}
                    </TableRow>
                    {visibleRows?.map((row: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.brand}</TableCell>
                        <TableCell>{row.model}</TableCell>
                        <TableCell>{row.year_prod}</TableCell>
                        <TableCell>{row.engine}</TableCell>
                        <TableCell>{row.fuel_type}</TableCell>
                        <TableCell>{row.color}</TableCell>
                        <TableCell>{row.gear_type}</TableCell>
                        {/* <TableCell>{row.price}</TableCell> */}
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
          <Dialog
            open={open}
            onClose={handleCloseCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Czy na pewno chcesz usunąć wybrany samochód?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Usunięte dane zostaną utracone!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Usuń</Button>
              <Button onClick={handleCloseCancel} autoFocus>
                Anuluj
              </Button>
            </DialogActions>
          </Dialog>
        </Layout>
      </Box>
    );
  }