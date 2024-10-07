import React from 'react'
import { Base_URL, DEFAULT_IMG } from '../utils/helper/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/redux/slices/feedSlice';
import axios from 'axios';

const UserCard = ({ user }) => {

    console.log("user..", user)
    const dispatch = useDispatch()
    const capitalizeFirstLetter = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    };

    const {
        _id, firstName, gender, lastName, skills, age, photo } = user;


    const handleSendRequest = async (status, toUserId) => {
        if (!toUserId) {
            console.error("toUserId not found!")
        }
        try {
            try {
                const res = await axios.post(Base_URL + "/request/send/" + status + "/" + toUserId, {}, { withCredentials: true })
                dispatch(removeUserFromFeed(toUserId))
            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    className='rounded-lg '
                    src={photo || DEFAULT_IMG}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{capitalizeFirstLetter(firstName) + " " + capitalizeFirstLetter(lastName)}</h2>
                <p className='m-0'>Age: {age} Year</p>
                <p className='m-0'>id: {_id}</p>
                <p className='m-0'>Skills: {skills}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary"
                        onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>

                    <button className="btn btn-primary"
                        onClick={() => handleSendRequest("intrested", _id)}>Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
