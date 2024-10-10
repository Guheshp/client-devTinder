import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/redux/slices/userSlice'
import toast from 'react-hot-toast'
import HomePage from './HomePage'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user.user)
    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get(Base_URL + "/profile/view", {
                withCredentials: true
            })
            dispatch(addUser(res?.data))
        } catch (error) {
            if (error.status === 401) {
                navigate("/")
                console.error(error)
            }
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div className=''>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}


export default Body
