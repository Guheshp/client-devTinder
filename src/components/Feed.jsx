import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed, removeUserFromFeed } from '../utils/redux/slices/feedSlice'
import UserCard from './UserCard'
import Skeleton from './Skeleton'
import SideProfile from './SideProfile'
import RightFeed from './RightFeed'
import { Navigate, useNavigate } from 'react-router-dom'
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
        }, 4000)
    }, [])


    if (!feed) return (
        <div className='h-screen flex justify-center items-center mt-42'>
            <div className='my-14 flex justify-center'>
                <Skeleton />
            </div>
        </div>
    )


    if (feed.length <= 0) return <Skeleton />
    return (
        <div className='flex justify-center items-center mt-10'>
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
