import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

import { Layout } from '../Components/Layout';

export default function EditOffer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [offer, setOffer] = useState({
    carId: '',
    idUser: '',
    price: '',
    availableFrom: '',
    availableTo: ''
  });

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editOffer();
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

  const editOffer = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      console.log(id);
      const res = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080'}/api/offers/` + id,
        offer,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data) {
        console.log(res.data);
        navigate('/userdashboard/show');
      }
    } catch (err) {
      alert('Error editing offer!');
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate('/userdashboard/show');
  };

  useEffect(() => {
    getOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
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
                <p>Price</p>
                <input
                  type="number"
                  name="price"
                  value={offer.price}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Offer from</p>
                <input
                  type="date"
                  name="availableFrom"
                  value={offer.availableFrom}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Offer to</p>
                <input
                  type="date"
                  name="availableTo"
                  value={offer.availableTo}
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
