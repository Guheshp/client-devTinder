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
            const res = await axios.get(Base_URL + "/page/feed", {
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


    if (feed.length <= 0) return (
        <div className='h-screen'>
            <div className='flex flex-col justify-center items-center mt-24'>
                <h1 className='text-center text-2xl font-bold'>No Users Found</h1>
                <p className='text-center text-gray-600 mt-2'>Newly registerd will seen here!</p>
                <button className='btn mt-10  text-white py-2 px-4 rounded  transition'>
                    <Link to={`/feed`} className='no-underline'>
                        Home
                    </Link>
                </button>
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
                                <div className='w-[36%]'>
                                    <UserCard user={feed[0]} />
                                </div>
                                <div className='w-[30%] h-[630px] overflow-y-auto'>
                                    <RightFeed newsData={newsData} />
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
