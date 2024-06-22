import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export function Add() {
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
    imageurl: ''
  });

  const createCar = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); 

    
      const carWithUserId = { ...car, idUser: userId };

      
      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/cars',
        carWithUserId,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (res) {
        console.log(res);
        window.location.reload();
      }
    } catch (err) {
      alert('Błąd podczas dodawania samochodu!');
      console.log(err);
    }
  };


  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCar();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="grid gap-5 place-items-center">
        <h1 className="text-[#bbd5d8] text-xl">Add new car</h1>
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
            type="number"
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
            <option value="">---choose type---</option>
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
            <option value="">---choose type---</option>
            {gear_types.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <p>Price</p>
          <input
            type="number"
            name="price"
            value={car.price}
            size={50}
            className="p-1.5"
            onChange={handleInputChange}
            required
          />
        </div> */}
        {/* <div>
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
        </div> */}
        <button type="submit" className="bg-[#bbd5d8] p-2.5 mb-10 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
