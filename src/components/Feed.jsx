import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed, removeUserFromFeed } from '../utils/redux/slices/feedSlice'
import UserCard from './UserCard'
import Skeleton from './Skeleton'
import SideProfile from './SideProfile'
import RightFeed from './RightFeed'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useNewsApi from './customhooks/useNewsApi'
import useFetchStocks from './customhooks/useFetchStocks'

const Feed = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed.feed)
    const { newsData } = useNewsApi()
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
        setTimeout(() => {
            getFeed()
            setLoading(false)
        }, 2000)
    }, [])


    if (!feed) return (
        <div className='h-screen flex justify-center items-center mt-42'>
            <div className='my-14 flex justify-center'>
                <Skeleton />
            </div>
        </div>
    )

    return (
        <div className='flex justify-center items-center mt-14'>
            {loading ?

                <Skeleton />
                :
                <>
                    <div className='w-9/12 h-screen'>

                        {feed &&
                            <div className='flex my-14 gap-6 '>
                                <div className='w-[30%]'>
                                    <SideProfile stockApi={stockApi} />
                                </div>
                                <div className="w-[36%] flex justify-center items-start">
                                    {feed.length > 0 ? (
                                        <UserCard user={feed[0]} />
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

                </>
            }

        </div>

    )
}

export default Feed
