import React, { useEffect, useState } from 'react'
import { NEWS_API } from '../../utils/helper/constant'

const useNewsApi = () => {
    const [newsData, setNewsData] = useState([])
    const handleNewsApi = async () => {
        try {
            const res = await fetch(NEWS_API)
            const json = await res.json()
            setNewsData(json?.articles)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        handleNewsApi()
    }, [])
    return { newsData }
}

export default useNewsApi
