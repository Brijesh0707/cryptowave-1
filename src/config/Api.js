export const Trend = (currency) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
};

export const Coinlist = (currency) => {
 return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
};


export const Single1 = (id) =>{
  return   `https://api.coingecko.com/api/v3/coins/${id}`;
}

export const Charts1 = (id, days = 365, currency) => {
 return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

}