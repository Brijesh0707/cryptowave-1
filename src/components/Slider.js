import React, { useEffect, useState } from 'react';
import './Slider.css';
import axios from 'axios';
import { Trend } from '../config/Api';
import { useCoinState } from '../Context-crypto';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const Slider = () => {
  const [trending1, setTrending1] = useState([]);
  const { currency } = useCoinState();

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(Trend(currency));
        setTrending1(data);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      }
    };

    fetchTrendingCoins();
  }, [currency]);

  const items = trending1.map((coin) => (
    <Link key={coin.id} className='trendings-slider' to={`/singlecoin/${coin.id}`}>
      <img src={coin.image} alt={coin.name} height='70' /><br />
      <span className='sym'>{coin.symbol}</span>
    </Link>
  ));

  return (
    <>
      <div className='trending'>
        <h1>Trending Coins</h1>
        <div className='slider-1'>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
