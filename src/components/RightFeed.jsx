import React from 'react'
import useNewsApi from './customhooks/useNewsApi'
import NewsData from './NewsData'

const RightFeed = () => {
    const { newsData } = useNewsApi()
    const data = newsData && newsData

    return (
        <div>
            <h1 className='font-bold text-2xl ms-3'>Trending News</h1>
            {data && data.slice(0, 8).map((item, index) => (
                <NewsData key={index} data={item} />
            ))}
        </div>
    )
}

export default RightFeed
