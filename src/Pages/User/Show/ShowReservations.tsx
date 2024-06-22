import React, { useEffect, useState, useMemo } from 'react';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../../../Components/Layout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ShowReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const getAllReservations = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); 

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + `/api/reservations/user/${userId}/reservations-with-offers`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res) {
        setReservations(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReservation = async (reservationId: number) => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); 
      
      const res = await axios.delete(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/reservations/' + reservationId,
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
    deleteReservation(selectedId);
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  useEffect(() => {
    if (reservations) {
      setCount(reservations.length);
    }
  }, [reservations]);

  const visibleRows = useMemo(
    () => reservations?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, reservations]
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editReservation = (reservationId: number) => {
    navigate('/editReservation/' + reservationId);
  };

  return (
    <Layout>
      <Box sx={{ p: '2vh', fontSize: 40, color: '#9f50ff' }}>
        <h2 className="tracking-wider text-[#bbd5d8]">Lista rezerwacji</h2>
        <Divider orientation="horizontal" sx={{ mt: '4px' }} />

        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Marka</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Rok produkcji</TableCell>
                  <TableCell>Silnik</TableCell>
                  <TableCell>Paliwo</TableCell>
                  <TableCell>Kolor</TableCell>
                  <TableCell>Skrzynia biegów</TableCell>
                  <TableCell>Od</TableCell>
                  <TableCell>Do</TableCell>
                </TableRow>
                {visibleRows?.map((reservation: any, index: number) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.brand}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.model}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.year_prod}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.engine}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.fuel_type}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.color}</TableCell>
                      <TableCell>{reservation.offerDetails?.carDetails?.gear_type}</TableCell>
                      <TableCell>{reservation.dateFrom}</TableCell>
                      <TableCell>{reservation.dateTo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={10}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                            Cena: {reservation.offerDetails?.price}
                          </Box>
                          <Box>
                            <Button
                              onClick={() => handleDeleteAlert(reservation.idReservation)}
                              className="hover:text-[#bbd5d8]"
                            >
                              <DeleteIcon sx={{ fontSize: 35 }} />
                            </Button>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
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
          {'Czy na pewno chcesz usunąć wybraną rezerwację?'}
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
  );
};
