import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import AlertDismissibleExample from '../Components/AlertDismissibleExample'; 

import { Layout } from '../Components/Layout';

export default function ReserveOffer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedOfferId, setSelectedOfferId] = useState('');

  const [offer, setOffer] = useState({
    carId: '',
    idUser: '',
    price: '',
    availableFrom: '',
    availableTo: ''
  });

  const [reservation, setReservation] = useState({
    idOffer: '',
    idUser: '',
    dateFrom: '',
    dateTo: ''
  });

  const [error, setError] = useState(""); 

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReservation();
  };

  const getOffer = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const idUser = localStorage.getItem('id'); 
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080'}/api/offers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data) {
        const { carId, idUser, price, availableFrom, availableTo } = res.data;
        setOffer({ carId, idUser, price, availableFrom, availableTo });


        setReservation({
          idOffer: id,
          idUser: idUser,
          dateFrom: "",
          dateTo: ""
        });
      }
    } catch (err) {
      console.log(err);
      navigate('/results');
    }
  };

  const createReservation = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id');

      
      const reservationWithUserIdAndOfferId = { ...reservation, idOffer: id, idUser: userId };
      console.log(id, userId);
      console.log(reservationWithUserIdAndOfferId);
      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/reservations',
        reservationWithUserIdAndOfferId,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (res) {
        console.log(res);
        navigate('/offers');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error adding reservation!'); 
      }
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate('/offers');
  };

  useEffect(() => {
    getOffer();

  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleAlertClose = () => {
    setError('');
    setReservation({
      ...reservation,
      dateFrom: '',
      dateTo: ''
    });
  };

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
            fontSize: 20,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <form autoComplete="off" onSubmit={handleClick}>
            <div className="grid gap-5 place-items-center ">
              <h1 className="text-[#bbd5d8] text-[40px]">Reserve a car</h1>

              <div>
                <p>Offer available from: {offer.availableFrom}</p>
                <input
                  type="date"
                  name="dateFrom"
                  value={reservation.dateFrom}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Offer available to: {offer.availableTo}</p>
                <input
                  type="date"
                  name="dateTo"
                  value={reservation.dateTo}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-6 grid-cols-2 ">
                <button
                  type="button"
                  className="bg-[#bbd5d8] p-2.5 mb-10 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#bbd5d8] p-2.5 mb-10 rounded"
                >
                  Submit
                </button>
              </div>
              {error && <AlertDismissibleExample message={error} onClose={handleAlertClose} />}
            </div>
          </form>
        </Box>
      </Layout>
    </Box>
  );
}
