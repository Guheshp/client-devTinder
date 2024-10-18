import React, { useEffect, useState } from 'react'
import { STOCK_API } from '../../utils/helper/constant'

const useFetchStocks = () => {
    const [stockApi, setStockApi] = useState([])
    const fetchStock = async () => {
        try {
            const res = await fetch(STOCK_API)
            const json = await res.json()
            setStockApi(json)
            console.log(json)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchStock()
    }, [])

    return { stockApi }
}

export default useFetchStocks
