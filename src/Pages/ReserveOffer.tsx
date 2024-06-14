import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

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
      }
    } catch (err) {
      console.log(err);
      navigate('/results');
    }
  };

//   const editReservation = async () => {
//     try {
//       const accessToken = localStorage.getItem('token');
//       console.log(id);
//       const res = await axios.put(
//         `${import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080'}/api/offers/` + id,
//         offer,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//           }
//         }
//       );
//       if (res.data) {
//         console.log(res.data);
//         navigate('/userdashboard/show');
//       }
//     } catch (err) {
//       alert('Error editing offer!');
//       console.log(err);
//     }
//   };

//   const fetchUserCars = async () => {
//     try {
//       const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
//       const accessToken = localStorage.getItem('token');

//       const res = await axios.get(
//         (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + `/api/cars/user/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         }
//       );

//       if (res) {
//         setCars(res.data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchUserCars();
//   }, []);

  const createReservation = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage

      // Create the offer object including the selected car ID and dates
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
      alert('Error adding reservation!');
      console.log(err);
    }
  };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     createOffer();
//   };

  const handleCancel = () => {
    navigate('/offers');
  };

  useEffect(() => {
    getOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
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
              <h1 className="text-[#bbd5d8] text-[40px]">Edit Offer</h1>

              <div>
                <p>Offer from</p>
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
                <p>Offer to</p>
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
                  Edit
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Layout>
    </Box>
  );
}
