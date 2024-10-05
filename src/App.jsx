import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import store from './utils/redux/appStore'
import Feed from './components/Feed'


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />} >
              <Route path='/' element={<Feed />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />x
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
