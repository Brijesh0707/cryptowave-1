import React, { useEffect, useState } from 'react';
import './Home.css';
import Video from '../img-video/back.mp4';
import Slider from '../components/Slider';
import axios from 'axios';
import { Coinlist } from '../config/Api';
import { useCoinState } from '../Context-crypto';
import { Link } from 'react-router-dom';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { currency, symbol } = useCoinState();

  const getPriceChangeColor = (priceChange) => {
    return priceChange >= 0 ? 'green' : 'red';
  };

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(Coinlist(currency));
      setCoins(data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className='banner'>
        <div className='banner-1'>
          <video autoPlay loop muted id='back'>
            <source src={Video} type='video/mp4' />
          </video>
          <div className='heading'>
            <h1>CryptoWave</h1>
            <p>Empowering the future of finance through blockchain innovation.</p>
          </div>
        </div>
      </section>
      <section id='trending'>
        <Slider />
      </section>
      <section id='coin-list'>
        <div className='search'>
          <h1>CryptoCurrency List Price</h1>
          <br />
          <form>
            <input
              type='text'
              placeholder='Search Coin Here'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className='lists'>
          <div className='table-responsive'>
            <table className='table1'>
              <thead>
                <tr id='header-01'>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Market Gap</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => (
                  <tr id='datas' key={coin.id}>
                    <td id='symbols-1'>
                      <Link to={`/singlecoin/${coin.id}`} id='coin-list'>
                        <img src={coin.image} alt={coin.name} height='20' />
                        {coin.symbol}
                      </Link>
                    </td>
                    <td>{symbol}{coin.current_price}</td>
                    <td style={{ color: getPriceChangeColor(coin.price_change_percentage_24h) }}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>{symbol}{coin.market_cap.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
