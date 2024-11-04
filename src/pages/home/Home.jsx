import React, { useContext, useState, useEffect } from 'react';
import "./Home.css";
import { CoinContext } from '../../Context/CoinContex';
import {Link} from 'react-router-dom'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState(allCoin);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);

    if (event.target.value==="") {
        setDisplayCoin(allCoin);
    }
  };


  const searchHandler = (event) => {
    event.preventDefault();
    const filteredCoins = input ? 
      allCoin.filter((item) => item.name.toLowerCase().includes(input.toLowerCase())) : 
      allCoin;
    
    setDisplayCoin(filteredCoins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Market Place</h1>
        <p>Welcome to the world's largest marketplace</p>
        <form onSubmit={searchHandler}>
  <input 
    type="text" 
    list="coinlist" 
    value={input} 
    placeholder="Search Here" 
    onChange={inputHandler} 
    required 
    aria-label="Search for a cryptocurrency" 
  />
  <datalist id="coinlist">
    {allCoin.map((item) => (
      <option key={item.id || item.name} value={item.name} />
    ))}
  </datalist>
  <button type="submit">Search</button>
</form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name + " _ " + item.symbol}</p>
            </div>
            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className='market-cap'>
              {currency.symbol.toLocaleString()}{item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
