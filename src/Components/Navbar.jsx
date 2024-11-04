import React, { useContext } from 'react';
import './Navbar.css';
import { CoinContext } from '../Context/CoinContex';
import { Link } from 'react-router-dom';
import logo from '../assets/images/crypto-logo.png'; // Adjusted the path for relative import

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    const currencyOptions = {
      usd: { name: 'usd', symbol: '$' },
      inr: { name: 'inr', symbol: '₹' },
      eur: { name: 'eur', symbol: '€' }
    };
    setCurrency(currencyOptions[event.target.value] || currencyOptions.usd);
  };

  return (
    <div className="navbar">
      <Link to="/">
      <div className="logo">
        <img src={logo} alt="Crypto Logo" />
        <p>CRYPTODEV</p>
        </div>
      </Link>
      <ul>
        <Link to="/"><li>Home</li></Link>
        <Link to="/pricing"><li>Pricing</li></Link>
        <Link to="/features"><li>Features</li></Link>
        <Link to="/blog"><li>Blog</li></Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
