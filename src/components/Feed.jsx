import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/redux/slices/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed.feed)
    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(Base_URL + "/feed")
            const data = res?.data?.data
            dispatch(addFeed(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        <div>
            {feed &&
                <div className='flex justify-center my-14'>
                    <UserCard user={feed[6]} />
                </div>
            }
        </div>

    )
}

export default Feed
