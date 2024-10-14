import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/redux/slices/feedSlice'
import UserCard from './UserCard'
import Skeleton from './Skeleton'

const Feed = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed.feed)
    const getFeed = async () => {
        // if (feed) return;
        try {
            const res = await axios.get(Base_URL + "/page/feed", { withCredentials: true })
            const data = res?.data?.data
            dispatch(addFeed(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        setTimeout(() => {
            getFeed()
            setLoading(false)
        }, 3000)
    }, [])

    if (!feed) return (
        <div className='my-14 flex justify-center'>
            <Skeleton />
        </div>
    )


    if (feed.length <= 0) return <h1 className='text-center mt-10 text-2xl'>No new Ueres Found</h1>
    return (
        <div>
            {loading ?
                <div className='my-14 flex justify-center'>
                    <Skeleton />
                </div> :
                <>
                    {feed &&
                        <div className='flex justify-center my-14'>
                            <UserCard user={feed[0]} />
                        </div>
                    }

                </>
            }

        </div>

    )
}

export default Feed
