import React from 'react'
import useNewsApi from './customhooks/useNewsApi'
import NewsData from './NewsData'

const RightFeed = ({ newsData, loading }) => {
    const data = newsData && newsData
    if (loading) return <p>loading...</p>
    return (
        <div className=' bg-base-300 rounded-xl'>
            <h1 className='font-bold text-2xl ms-3 pt-2'>Trending News</h1>

            {data && data.slice(0, 8).map((item, index) => (
                <NewsData key={index} data={item} />
            ))}
        </div>
    )
}

export default RightFeed
