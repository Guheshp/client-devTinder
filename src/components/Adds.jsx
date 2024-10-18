import React, { useState, useEffect } from 'react';
import useFetchStocks from './customhooks/useFetchStocks';

const Adds = ({ stockApi }) => {

    const [stocks, setStocks] = useState([]);
    const [originalStocks, setOriginalStocks] = useState([]);

    useEffect(() => {
        if (stockApi) {
            setStocks(stockApi);
            setOriginalStocks(stockApi);
        }
    }, [stockApi]);

    const deleteTopStock = () => {
        if (stocks.length > 0) {
            const updatedStocks = stocks.slice(1);
            setStocks(updatedStocks);
            if (updatedStocks.length === 0) {
                setStocks(originalStocks);
            }
        }
    };

    return (
        <>

            <p className='bg-base-200 p-2 rounded-lg'>Stocks Adds</p>
            <div className="stack mt-3">

                {stocks.length > 0 ? (
                    stocks.map((stock, index) => (
                        <div key={index} className="bg-gray-100 shadow-md rounded-lg p-4 w-80 transition-transform transform hover:scale-105 h-52">
                            <div className="bg-blue-600 text-white rounded-t-lg p-2">
                                <h2 className="text-lg font-bold">{stock?.symbol}</h2>
                            </div>
                            <div className="mt-2">
                                <p className="font-semibold">{stock.name}</p>
                                <p className="text-gray-700">Exchange: {stock.exchangeShortName}</p>
                                <p className="text-gray-700">Stock Exchange: {stock.stockExchange}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notifications</p>
                )}
            </div>
            {stocks.length > 0 && (
                <button onClick={deleteTopStock} className=" float-end  btn  btn-error mt-3">
                    Next Stock
                </button>
            )}
        </>
    );
};

export default Adds;
