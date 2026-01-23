import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/redux/slices/feedSlice'
import { BsHourglassSplit, BsGem, BsEmojiFrown } from "react-icons/bs"

import SideProfile from './SideProfile'
import RightFeed from './RightFeed'
import FeedSkeleton from './skeleton/FeedSkeleton'
import Main from './feed/Main'
import { Link } from 'react-router-dom'
import FeedCardSkeleton from './skeleton/FeedCardSkeleton'

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed.feed) || [] // Ensure it's always an array
    const user = useSelector((store) => store.user.user)

    // --- State ---
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({ page: 1, limit: 10 })
    const [isLimitReached, setIsLimitReached] = useState(false)

    // 🔥 NEW: Stop Flag to prevent infinite calls
    const [noMoreData, setNoMoreData] = useState(false)

    // 2. Dynamic Limit Logic
    const isPremium = user?.isPremium || false;
    const MAX_PROFILES = isPremium ? 200 : 50;

    // --- 1. The Fetch Function ---
    const getFeed = async () => {
        // 🛑 STOP: If we already know DB is empty, or Limit reached, or currently loading
        if (noMoreData || isLimitReached || loading) return;

        // 🛑 STOP: Check Daily Limit
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

            // ✅ LOGIC FIX: If we asked for 10 but got less (e.g. 2 or 0), 
            // it means the DB has run out of data.
            if (data.length < params.limit) {
                setNoMoreData(true)
            }

            dispatch(addFeed(data))
        } catch (error) {
            console.error("Feed Fetch Error:", error)
        } finally {
            setLoading(false)
        }
    }

    // --- 2. Reactive Fetching ---
    useEffect(() => {
        // Only fetch if we haven't determined there is no more data
        if (!noMoreData) {
            getFeed()
        }
    }, [params]) // Remove other dependencies to prevent loops

    // --- 3. Watch Feed to Trigger Next Page ---
    useEffect(() => {
        // Only go to next page if:
        // 1. Feed is empty
        // 2. Not currently loading
        // 3. Haven't reached daily limit
        // 4. 🔥 We haven't reached the end of the DB yet
        if (feed.length === 0 && !loading && !isLimitReached && !noMoreData) {
            setParams(prev => ({
                ...prev,
                page: prev.page + 1,
            }))
        }
    }, [feed, loading, isLimitReached, noMoreData])

    // --- RENDER ---
    // If it's the first page load, show Skeleton
    if (loading && params.page === 1) return <FeedSkeleton />

    return (
        <div className='flex justify-center items-start mt-14 min-h-screen bg-base-100 px-4 pb-10'>
            <div className='w-full md:w-[95%] lg:w-11/12 xl:w-9/12'>
                <div className='flex flex-col md:flex-row my-6 md:my-14 gap-4 lg:gap-6 justify-center items-start'>

                    {/* Left Sidebar */}
                    <div className='hidden md:block md:w-[35%] lg:w-[28%] xl:w-[30%]'>
                        <SideProfile />
                    </div>

                    {/* Main Content */}
                    <div className="w-full sm:max-w-md md:max-w-none md:w-[60%] lg:w-[40%] xl:w-[36%] flex justify-center items-start mx-auto">
                        {feed && feed.length > 0 ? (
                            <Main user={feed[0]} />
                        ) : (
                            <div className="w-full">
                                {/* PRIORITY 1: Daily Limit Reached */}
                                {isLimitReached ? (
                                    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-warning text-center">
                                        <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <BsHourglassSplit className="text-3xl text-warning" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">Daily Limit Reached</h2>
                                        <p className="text-gray-600 mt-2">
                                            You've viewed {MAX_PROFILES} profiles today.
                                        </p>
                                        {!isPremium && (
                                            <div className="space-y-3 mt-4">
                                                <Link to="/premium" className="btn btn-primary w-full text-white gap-2">
                                                    <BsGem /> Upgrade for 200/day
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )
                                    // PRIORITY 2: Loading State (Waiting for next page)
                                    : loading ? (
                                        <FeedCardSkeleton />
                                    )
                                        // PRIORITY 3: No More Data (DB Empty)
                                        : noMoreData ? (
                                            <div className="bg-base-200 p-8 rounded-xl shadow-inner w-full text-center border border-base-300">
                                                <BsEmojiFrown className="text-4xl text-gray-400 mx-auto mb-3" />
                                                <h2 className="text-xl font-bold text-gray-600">No more profiles</h2>
                                                <p className="text-gray-500 mt-1 text-sm">You've seen everyone available!</p>
                                            </div>
                                        )
                                            // FALLBACK
                                            : null}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className='hidden lg:block lg:w-[30%] xl:w-[30%] h-[630px] overflow-y-auto custom-scrollbar sticky top-24'>
                        <RightFeed />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed