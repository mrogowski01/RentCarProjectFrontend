import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import AlertDismissibleExample from '../../../Components/AlertDismissibleExample'; 

export function AddOffer() {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [offer, setOffer] = useState({
    price: '',
    availableFrom: '',
    availableTo: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserCars = async () => {
    try {
      const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
      const accessToken = localStorage.getItem('token');

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + `/api/cars/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (res) {
        setCars(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserCars();
  }, []);

  const createOffer = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage

      // Create the offer object including the selected car ID and dates
      const offerWithUserId = { ...offer, carId: selectedCarId, idUser: userId };
      console.log(selectedCarId, userId);
      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') + '/api/offers',
        offerWithUserId,
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
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data); // Set error message from server response
      } else {
        setErrorMessage('Error adding offer!');
      }
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createOffer();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
  };

  const handleAlertClose = () => {
    setErrorMessage('');
    // Optionally, reset only specific fields like availableFrom and availableTo
    setOffer({
      ...offer,
      availableFrom: '',
      availableTo: ''
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="grid gap-5 place-items-center">
        {errorMessage && <AlertDismissibleExample message={errorMessage} onClose={handleAlertClose} />}
        <h1 className="text-[#bbd5d8] text-xl">Add New Offer</h1>
        <div>
          <p>Select Car</p>
          <select
            name="selectedCarId"
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            className="block w-[20rem] p-2.5"
            required
          >
            <option value="">---Select Car---</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} {car.year_prod} {car.engine} {car.fuel_type} {car.color} {car.gear_type}
              </option>
            ))}
          </select>
        </div>
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
        <button type="submit" className="bg-[#bbd5d8] p-2.5 mb-10 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
