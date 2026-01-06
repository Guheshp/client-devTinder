import React from 'react'
import ProfilePage from './ProfilePage'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'


const Profile = () => {

    const userData = useSelector((store) => store.user.user)
    return (
        <>
            <div className='min-h-screen pt-24 bg-base-200'>
                {userData && (
                    <ProfilePage user={userData} />
                )}
            </div>
        </>

    )
}

export default Profile
