import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/redux/slices/feedSlice'
import { BsHourglassSplit, BsGem, BsEmojiFrown } from "react-icons/bs"

import SideProfile from './SideProfile'
import RightFeed from './RightFeed'
import useFetchStocks from './customhooks/useFetchStocks'
import FeedSkeleton from './skeleton/FeedSkeleton'
import Main from './feed/Main'
import { Link } from 'react-router-dom'
import FeedCardSkeleton from './skeleton/FeedCardSkeleton'

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed.feed)
    // 1. Get the logged-in user from Redux to check premium status
    const user = useSelector((store) => store.user.user)
    const { stockApi } = useFetchStocks()

    // --- State ---
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({ page: 1, limit: 10 })
    const [isLimitReached, setIsLimitReached] = useState(false)

    // 2. Dynamic Limit Logic
    const isPremium = user?.isPremium || false;
    const MAX_PROFILES = isPremium ? 200 : 50;

    // --- 1. The Fetch Function ---
    const getFeed = async () => {
        // Stop if we have already fetched enough profiles
        if ((params.page - 1) * params.limit >= MAX_PROFILES) {
            setIsLimitReached(true)
            return
        }

        try {
            setLoading(true)
            const res = await axios.post(
                Base_URL + "/user/feed",
                params,
                { withCredentials: true }
            )
            const data = res?.data?.data || []
            dispatch(addFeed(data))
        } catch (error) {
            console.error("Feed Fetch Error:", error)
        } finally {
            setLoading(false)
        }
    }

    // --- 2. Reactive Fetching ---
    useEffect(() => {
        getFeed()
    }, [params])

    // --- 3. Watch Feed to Trigger Next Page ---
    useEffect(() => {
        if (feed && feed.length === 0 && !loading && !isLimitReached) {
            setParams(prev => ({
                page: prev.page + 1,
                limit: 10
            }))
        }
    }, [feed])

    // --- RENDER ---
    if (loading && params.page === 1) return <FeedSkeleton />

    return (
        <div className='flex justify-center items-center mt-14'>
            <div className='w-9/12 h-screen'>
                <div className='flex my-14 gap-6 '>

                    {/* Left Sidebar */}
                    <div className='w-[30%]'>
                        <SideProfile stockApi={stockApi} />
                    </div>

                    {/* Main Content Area */}
                    <div className="w-[36%] flex justify-center items-start">
                        {feed && feed.length > 0 ? (
                            <Main user={feed[0]} />
                        ) : (
                            <div className="w-full">
                                {isLimitReached ? (
                                    // LIMIT REACHED UI
                                    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-warning text-center">
                                        <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <BsHourglassSplit className="text-3xl text-warning" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">Daily Limit Reached</h2>
                                        <p className="text-gray-600 mt-2">
                                            You've viewed {MAX_PROFILES} profiles today.
                                        </p>

                                        {/* Only show Upgrade button if user is NOT premium */}
                                        {!isPremium ? (
                                            <div className="space-y-3 mt-4">
                                                <p className="text-sm text-gray-500">Want to see more?</p>
                                                <Link to="/premium" className="btn btn-primary w-full text-white gap-2">
                                                    <BsGem /> Upgrade for 200/day
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-500">
                                                Come back tomorrow for more connections!
                                            </div>
                                        )}
                                    </div>
                                ) : loading ? (
                                    // LOADING NEXT BATCH (Shimmer UI)
                                    <FeedCardSkeleton />
                                ) : (
                                    // EMPTY DB UI
                                    <div className="bg-base-300 p-6 rounded-xl shadow w-full text-center">
                                        <BsEmojiFrown className="text-4xl text-gray-400 mx-auto mb-3" />
                                        <h2 className="text-xl font-semibold">No more profiles</h2>
                                        <p className="text-gray-600 mt-2">You've seen everyone available!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className='w-[30%] h-[630px] overflow-y-auto'>
                        <RightFeed />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed