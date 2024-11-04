import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContex';
import LineChart from '../../Components/LineChart';

const Coin = () => {
  const { currency } = useContext(CoinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalCoinData, setHistoricalCoinData] = useState(null);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-qPo7DeXMaWmnibGLYqVxDJgK'
      }
    };
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchHistoricalCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-qPo7DeXMaWmnibGLYqVxDJgK'
      }
    };
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=30&interval=daily`, options);
      const data = await response.json();
      setHistoricalCoinData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
      fetchHistoricalCoinData();
    }
  }, [currency, coinId]);

  if (!coinId) {
    return <div>No coin ID provided!</div>;
  }

  return (
    <div className="coin">
      {coinData && historicalCoinData ? (
        <div className="coin-name">
          <img src={coinData.image.large} alt={`${coinData.name}`} />
          <p><b>{coinData.name.toUpperCase()} ({coinData.symbol.toUpperCase()})</b></p>
         
         <div className="chart">
          <LineChart historicalCoinData={historicalCoinData}/>
         </div>
         
        <div className="coin-info">
        <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Crypto Price</li>
        <li>
          {currency.symbol}
          {coinData.market_data.current_price[currency.name] || "N/A"}
        </li>
      </ul>
      <ul>
        <li>Market Cap</li>
        <li>
          {currency.symbol}
          {coinData.market_data.market_cap[currency.name] || "N/A"}
        </li>
      </ul>
      <ul>
        <li>24 Hour High</li>
        <li>
          {currency.symbol}
          {coinData.market_data.high_24h[currency.name] || "N/A"}
        </li>
      </ul>
      <ul>
        <li>24 Hour Low</li>
        <li>
          {currency.symbol}
          {coinData.market_data.low_24h[currency.name] || "N/A"}
        </li>
      </ul>
          </div>
        </div>

      ) : (
        <div className="spinner">
          <div className="spin"></div>
        </div>
      )}
    </div>
  );
};

export default Coin;
