import React, { useEffect, useState, useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Components/Layout';
import { Navbar } from '../../Components/Navbar';
import axios from 'axios';

export default function AllOffers() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [selectedId, setSelectedId] = useState<number>(-1);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [offers, setOffers] = useState([]);

    const getAllOffers = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const userId = localStorage.getItem('id'); // Zakładając, że identyfikator użytkownika jest przechowywany w localStorage

            const res = await axios.get(
                (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + `/api/offers`,
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

    const handleReserve = (offerId: number) => {
        // Dodaj logikę rezerwacji oferty tutaj
        console.log(`Rezerwacja oferty ${offerId}`);
        navigate('/reserveOffer/' + offerId);
    };
    
    // const editOffer = (offerId: number) => {
    //   navigate('/editOffer/' + offerId);
    // };

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
                                                                onClick={() => handleReserve(offer.idOffer)}
                                                                className="hover:text-[#bbd5d8]"
                                                            >
                                                                Zarezerwuj
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
            </Layout>
        </Box>
    );
}
