import React from 'react'
import ProfilePage from './ProfilePage'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'


const Profile = () => {

    const userData = useSelector((store) => store.user.user)
    return (
        <>
            {userData &&

                <div className=''>
                    <ProfilePage user={userData} />
                </div>

            }
        </>

    )
}

export default Profile
