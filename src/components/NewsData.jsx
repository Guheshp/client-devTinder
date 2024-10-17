import React from 'react'
import { Link } from 'react-router-dom';

const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval === 1 ? "1y ago" : `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? "1m ago" : `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? "1d ago" : `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? "1h ago" : `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? "1min ago" : `${interval} minutes ago`;
    }
    return "just now";
};
const truncateTitle = (title, maxLength = 50) => {
    if (title?.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    }
    return title;
};


const NewsData = ({ data }) => {
    console.log(data)
    const author = data?.author
    const source = data?.source?.name
    const publishedAt = data?.publishedAt
    const title = data?.title



    return (
        <div className='m-2 rounded '>
            <Link>
                <div className='hover:bg-base-200 p-3 rounded'>
                    <h1 className='font-semibold text-lg'>{source}</h1>
                    <h1 className='text-sm '>{truncateTitle(title)} </h1>
                    <p className='text-sm text-gray-400 mt-2'>{timeAgo(publishedAt)}</p>
                </div>
            </Link>

        </div>
    )
}

export default NewsData
