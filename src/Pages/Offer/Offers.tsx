import React, { useEffect, useState, useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Components/Layout';
import { Navbar } from '../../Components/Navbar';
import axios from 'axios';
import '../../index.css'

export default function AllOffers() {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);

    const getAllOffers = async () => {
        try {
            const accessToken = localStorage.getItem('token');

            const res = await axios.get(
                (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + `/api/offers`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            if (res.data) {
                setOffers(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllOffers();
    }, []);

    const handleReserve = (offerId: number) => {
        navigate(`/reserveOffer/${offerId}`);
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
                                    {offers.map((offer, index) => (
                                        <React.Fragment key={offer.idOffer} >
                                            <TableRow className={offer.reserved ? 'reserved' : ''}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{offer.carDetails?.brand}</TableCell>
                                                <TableCell>{offer.carDetails?.model}</TableCell>
                                                <TableCell>{offer.carDetails?.year_prod}</TableCell>
                                                <TableCell>{offer.carDetails?.engine}</TableCell>
                                                <TableCell>{offer.carDetails?.fuel_type}</TableCell>
                                                <TableCell>{offer.carDetails?.color}</TableCell>
                                                <TableCell>{offer.carDetails?.gear_type}</TableCell>
                                            </TableRow>
                                            <TableRow className={offer.reserved ? 'reserved' : ''}>
                                                <TableCell colSpan={8}>
                                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                                        <Box>
                                                            Cena: {offer.price}
                                                        </Box>
                                                        <Box>
                                                            Od: {offer.availableFrom} do {offer.availableTo}
                                                        </Box>
                                                        {!offer.reserved && (
                                                            <Box>
                                                                <Button
                                                                    onClick={() => handleReserve(offer.idOffer)}
                                                                    className="hover:text-[#bbd5d8]"
                                                                >
                                                                    Zarezerwuj
                                                                </Button>
                                                            </Box>
                                                        )}
                                                          {offer.reserved && (
                                                            <Box>
                                                              <p className="hover:text-[#bbd5d8]"> RESERVED</p>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Layout>
        </Box>
    );
}
