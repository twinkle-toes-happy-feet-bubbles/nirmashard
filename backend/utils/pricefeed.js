const axios = require('axios');
const cache = new Map();
async function getBTCINR(date){
  const d = date.toISOString().slice(0,10); // YYYY-MM-DD
  if(cache.has(d)) return cache.get(d);
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${d.split('-').reverse().join('-')}`;
  const {data} = await axios.get(url);
  const usd = data.market_data.current_price.usd;
  const inr = usd * 83;
  cache.set(d,inr); return inr;
}
module.exports = {getBTCINR};