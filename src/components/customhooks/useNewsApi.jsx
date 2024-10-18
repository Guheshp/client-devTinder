import React, { useEffect, useState } from 'react';
import { NEWS_API } from '../../utils/helper/constant';

const useNewsApi = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleNewsApi = async () => {
        try {
            const res = await fetch(NEWS_API);
            const json = await res.json();
            setNewsData(json?.articles);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleNewsApi();
    }, []);

    return { newsData, loading };
};

export default useNewsApi;
