import React from 'react'
import { DEFAULT_IMG } from '../utils/helper/constant';


const UserCard = ({ user }) => {

    // console.log("user..", user)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    const {
        firstName,
        gender,
        lastName,
        skills,
        age,
        photo
    } = user;

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
                <p className='m-0'>Skills: {skills}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary">Ignore</button>
                    <button className="btn btn-primary">Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
