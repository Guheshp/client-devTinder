import React from 'react'
import ProfilePage from './ProfilePage'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'


const Profile = () => {

    const userData = useSelector((store) => store.user.user)
    console.log("userData!..", userData)
    return (
        <>
            <div className='h-screen mt-24'>
                {userData &&
                    <div className=''>
                        <ProfilePage user={userData} />
                    </div>
                }
            </div>
        </>

    )
}

export default Profile
