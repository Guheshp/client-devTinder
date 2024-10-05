import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />} >
            <Route path='/Login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />x
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
