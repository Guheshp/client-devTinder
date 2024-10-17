import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/redux/slices/feedSlice'
import UserCard from './UserCard'
import Skeleton from './Skeleton'
import SideProfile from './SideProfile'
import RightFeed from './RightFeed'

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
        }, 1000)
    }, [])

    if (!feed) return (
        <div className='h-screen flex justify-center items-center mt-42'>
            <div className='my-14 flex justify-center'>
                <Skeleton />
            </div>
        </div>
    )


    if (feed.length <= 0) return <h1 className='text-center mt-10 text-2xl'>No new Ueres Found</h1>
    return (
        <div className='flex justify-center items-center mt-14'>
            {loading ?
                <div className=' flex justify-center'>
                    <Skeleton />
                </div> :
                <>
                    <div className='w-9/12'>

                        {feed &&
                            <div className='flex  my-14 gap-6 '>
                                <div className='w-80'>
                                    <SideProfile />
                                </div>
                                <UserCard user={feed[0]} />
                                <div className='w-80 h-[530px] overflow-y-auto'>
                                    <RightFeed />
                                </div>
                            </div>
                        }
                    </div>

                </>
            }

        </div>

    )
}

export default Feed
