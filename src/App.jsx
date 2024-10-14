import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider, useSelector } from 'react-redux'
import store from './utils/redux/appStore'
import Feed from './components/Feed'
import { Toaster } from 'react-hot-toast'
import Connections from './components/Connections'
import Request from './components/Request'
import HomePage from './components/HomePage'
import ThemeToggle from './components/ThemeToggle'


function App() {
  return (
    <Provider store={store}>

      <Toaster position="bottom-left" reverseOrder={false} />
      <Main />
    </Provider>
  );
}

function Main() {
  const userData = useSelector((state) => state.user.user);


  return (
    <>
      <Provider store={store}>
        <Toaster position="bottom-left" reverseOrder={false} />
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />} >
              <Route path='/' element={userData ? <Navigate to="/feed" /> : <HomePage />} />
              <Route path='/feed' element={<Feed />} />
              <Route path='/login' element={userData ? <Navigate to="/" /> : <Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/connections' element={<Connections />} />
              <Route path='/requests' element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
