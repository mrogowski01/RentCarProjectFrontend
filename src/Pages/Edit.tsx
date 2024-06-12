import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Layout } from '../Components/Layout';

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fuel_types = ['Diesel', 'Gasoline', 'Electric', 'Hybrid'];
  const gear_types = ['Automatic', 'Manual'];

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year_prod: '',
    engine: '',
    fuel_type: '',
    color: '',
    gear_type: '',
    price: '',
    imageurl: '',
  });

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editCar();
  };


  const getCar = async () => {
    try {
      const accessToken = localStorage.getItem('token');

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/cars/' + id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        setCar(res.data);
      }
    } catch (err) {
      console.log(err);
      navigate('/results');
    }
  };

  const editCar = async () => {
    try {
      const accessToken = localStorage.getItem('token');

      const res = await axios.put(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/cars/' + id,
        car,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res) {
        console.log(res);
        navigate('/userdashboard/show');
      }
    } catch (err) {
      alert('Błąd podczas edytowania samochodu!');
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate('/userdashboard/show');
  };

  useEffect(() => {
    getCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
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
            flexDirection: 'column',
          }}
        >
          <form autoComplete="off" onSubmit={handleClick}>
            <div className="grid gap-5 place-items-center ">
              <h1 className="text-[#bbd5d8] text-[40px]">Edytuj samochód</h1>
              <div>
                <p>Brand</p>
                <input
                  type="text"
                  name="brand"
                  value={car.brand}
                  size={50}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Model</p>
                <input
                  type="text"
                  name="model"
                  value={car.model}
                  size={50}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Year of production</p>
                <input
                  type="text"
                  name="year_prod"
                  value={car.year_prod}
                  size={50}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Engine capacity</p>
                <input
                  type="text"
                  name="engine"
                  value={car.engine}
                  size={50}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
          <p>Fuel type</p>
          <select
            name="fuel_type"
            className="block w-[20rem] p-2.5"
            onChange={handleInputChange}
            required
          >
            <option value={car.fuel_type}>{car.fuel_type}</option>
            {fuel_types.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
              <div>
                <p>Color</p>
                <input
                  type="text"
                  name="color"
                  value={car.color}
                  size={50}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
                    <div>
                <p>Gearbox</p>
                <select
                  name="gear_type"
                  className="block w-[20rem] p-2.5"
                  onChange={handleInputChange}
                  required
                >
                  <option value={car.gear_type}>{car.gear_type}</option>
                  {gear_types.map((t, index) => (
                    <option key={index} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Price</p>
                <input
                  type="text"
                  name="price"
                  value={car.price}
                  size={50}
                  className="p-1.5"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p>Image URL</p>
                <input
                  type="text"
                  name="imageurl"
                  value={car.imageurl}
                  size={50}
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
