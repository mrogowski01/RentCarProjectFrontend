import { Routes, Route } from 'react-router-dom'
// import Home from '../Pages/Home'
import { ProtectedRoute } from './ProtectedRoute'
import { OpenRoute } from './OpenRoute'
import Landing from '../Pages/Landing'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import { UserDashboard } from '../Pages/User/UserDashboard'
import AllCars from '../Pages/Car/Cars'
import AllOffers from '../Pages/Offer/Offers'
import Edit from '../Pages/Edit'
import EditOffer from '../Pages/EditOffer'
import ReserveOffer from '../Pages/ReserveOffer'

export enum routes {
  register = '/register',
  login = '/login',
  userdashboard = '/userdashboard/:action',
  landing = '/landing',
  edit = '/edit/:id',
  editOffer = '/editOffer/:id',
  reserveOffer = '/reserveOffer/:id',
  profile = 'profile/:id',
  all = '/*',
  allcars = '/cars',
  alloffers = '/offers'
}

export const Router = () => (
  <Routes>
  
    <Route path={routes.all} element={<Login />}></Route>
    <Route
      path={routes.login}
      element={
        <OpenRoute>
          <Login />
        </OpenRoute>
      }
    ></Route>
    <Route
      path={routes.register}
      element={
        <OpenRoute>
          <Register />
        </OpenRoute>
      }
    ></Route>


    <Route
      path={routes.landing}
      element={
        <ProtectedRoute>
          <Landing />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.userdashboard}
      element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.allcars}
      element={
        <ProtectedRoute>
          <AllCars />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.alloffers}
      element={
        <ProtectedRoute>
          <AllOffers />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.edit}
      element={
        <ProtectedRoute>
          <Edit />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.editOffer}
      element={
        <ProtectedRoute>
          <EditOffer />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.reserveOffer}
      element={
        <ProtectedRoute>
          <ReserveOffer />
        </ProtectedRoute>
      }
    ></Route>
    {}
  </Routes>
)
