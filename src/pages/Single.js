import React, { useState, useEffect } from 'react';
import './Single.css';
import { useParams } from 'react-router-dom';
import { useCoinState } from '../Context-crypto';
import { Charts1, Single1 } from '../config/Api';
import axios from 'axios';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";

const Single = () => {
  const { id } = useParams();
  const { currency, symbol } = useCoinState();
  const [coins, setCoins] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [chartData, setChartData] = useState({ prices: [] });
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(Single1(id));
      setCoins(data);
    } catch (error) {
      setError('Error fetching coin data');
    } finally {
      setLoading(false);
    }
  };

  ChartJS.register(
    LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
  );

  const fetchCharts = async () => {
    try {
      const { data } = await axios.get(Charts1(id, days, currency));
      setChartData(data);
    } catch (error) {
      setError('Error fetching chart data');
    }
  };

  const handleDaysChange = (days) => {
    setDays(days);
  };

  console.log(chartData);

  const toggleDescription = () => {
    setShowFullDescription((prevValue) => !prevValue);
  };

  const cleanDescription = (description) => {
    if (description) {
      return description.replace(/<\/?[^>]+(>|$)/g, '');
    }
    return '';
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCoin();
    fetchCharts();
  }, [id, days, currency]);

  const data01 = {
    labels: chartData.prices.map((priceData) => new Date(priceData[0]).toLocaleDateString()),
    datasets: [{
      label: 'Price',
      data: chartData.prices.map((priceData) => priceData[1]),
      borderColor: '#66D3FA',
      tension: 0.4
    }]
  };

  const options01 = {};

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        <div className="main">
          <div className="left">
            <img src={coins?.image.large} alt={coins?.name} height="200" id="img-2" />
            <br />
            <br />
            <p>
              <span>Coin</span> - {coins?.name}
            </p>
            <br />
            <p>
              <span>Rank</span> - {coins?.market_cap_rank}
            </p>
            <br />
            <p>
              <span>Current Price</span> - {symbol}
              {coins?.market_data.current_price[currency.toLowerCase()]}
            </p>
            <br />
            <p>
              <span>Market Gap</span> - {symbol}
              {coins?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)}
            </p>
            {showFullDescription ? (
              <>
                <p>
                  <span id="desc">Description</span> - {cleanDescription(coins?.description.en)}
                </p>
                <button onClick={toggleDescription} id="more">
                  Show Less
                </button>
              </>
            ) : (
              <>
                <p>
                  <span id="desc">Description</span> - {cleanDescription(coins?.description.en).slice(0, 300)}
                  {cleanDescription(coins?.description.en).length > 300 && '...'}
                </p>
                {cleanDescription(coins?.description.en).length > 300 && (
                  <button onClick={toggleDescription} id="more">
                    Show More
                  </button>
                )}
              </>
            )}
          </div>
          <div className="right">
            <Line
              data={data01}
              options={options01}
            />
            <div className="buttons-container">
              <button onClick={() => handleDaysChange(1)}>1 Day</button>
              <button onClick={() => handleDaysChange(7)}>1 Week</button>
              <button onClick={() => handleDaysChange(30)}>1 Month</button>
              <button onClick={() => handleDaysChange(365)}>1 Year</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Single;
