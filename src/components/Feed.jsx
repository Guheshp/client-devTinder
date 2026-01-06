import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/redux/slices/feedSlice'
// Change import here
import SideProfile from './SideProfile'
import RightFeed from './RightFeed'
import useFetchStocks from './customhooks/useFetchStocks'
import FeedSkeleton from './skeleton/FeedSkeleton'
import Main from './feed/Main'

const Feed = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed.feed)
    const { stockApi } = useFetchStocks();

    const getFeed = async () => {
        try {
            const res = await axios.get(Base_URL + "/user/feed", {
                withCredentials: true
            })
            const data = res?.data?.data
            dispatch(addFeed(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Keep your timeout if you want to force show the skeleton
        const timer = setTimeout(() => {
            getFeed()
            setLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    // Use FeedSkeleton here
    if (loading) return <FeedSkeleton />
    if (!feed) return <FeedSkeleton />

    return (
        <div className='flex justify-center items-center mt-14'>
            <div className='w-9/12 h-screen'>
                {feed &&
                    <div className='flex my-14 gap-6 '>
                        <div className='w-[30%]'>
                            <SideProfile stockApi={stockApi} />
                        </div>
                        <div className="w-[36%] flex justify-center items-start">
                            {feed.length > 0 ? (
                                <Main user={feed[0]} />
                            ) : (
                                <div className=" bg-base-300 p-6 rounded-xl shadow w-full">
                                    <h2 className="text-xl font-semibold">No users found</h2>
                                    <p className="text-gray-600 mt-2">
                                        You have reached the end of the feed.
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Check back later for new profiles 👋
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className='w-[30%] h-[630px] overflow-y-auto'>
                            <RightFeed />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Feed