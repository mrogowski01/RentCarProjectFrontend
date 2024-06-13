import React, { useEffect, useState, useMemo } from 'react';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../../../Components/Layout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ShowOffers = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const getAllOffers = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); // Zakładając, że identyfikator użytkownika jest przechowywany w localStorage

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + `/api/offers/user/${userId}/offers-with-cars`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res) {
        setOffers(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOffer = async (offerId: number) => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); 
      
      const res = await axios.delete(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/offers/' + offerId,
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
    deleteOffer(selectedId);
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllOffers();
  }, []);

  useEffect(() => {
    if (offers) {
      setCount(offers.length);
    }
  }, [offers]);

  const visibleRows = useMemo(
    () => offers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, offers]
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editOffer = (offerId: number) => {
    navigate('/editOffer/' + offerId);
  };

  return (
    <Layout>
      <Box sx={{ p: '2vh', fontSize: 40, color: '#9f50ff' }}>
        <h2 className="tracking-wider text-[#bbd5d8]">Lista ofert</h2>
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
                </TableRow>
                {visibleRows?.map((offer: any, index: number) => (
                  <React.Fragment key={index}>
                    {/* First row with car details */}
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{offer.carDetails?.brand}</TableCell>
                      <TableCell>{offer.carDetails?.model}</TableCell>
                      <TableCell>{offer.carDetails?.year_prod}</TableCell>
                      <TableCell>{offer.carDetails?.engine}</TableCell>
                      <TableCell>{offer.carDetails?.fuel_type}</TableCell>
                      <TableCell>{offer.carDetails?.color}</TableCell>
                      <TableCell>{offer.carDetails?.gear_type}</TableCell>
                    </TableRow>
                    {/* Second row with price and dates */}
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                            Cena: {offer.price}
                          </Box>
                          <Box>
                            Od: {offer.availableFrom} do {offer.availableTo}
                          </Box>
                          <Box>
                            <Button
                              onClick={() => editOffer(offer.idOffer)}
                              className="hover:text-[#bbd5d8]"
                            >
                              <EditIcon sx={{ fontSize: 35 }} />
                            </Button>
                            <Button
                              onClick={() => handleDeleteAlert(offer.idOffer)}
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
          {'Czy na pewno chcesz usunąć wybraną ofertę?'}
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
