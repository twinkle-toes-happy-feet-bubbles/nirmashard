const axios = require('axios');
const pLimit = require('p-limit').default;
const cache = new Map();

const limit = pLimit(1);

async function getBTCINR(date) {
  const dateString = date.toISOString().slice(0, 10);
  if (cache.has(dateString)) {
    return cache.get(dateString);
  }

  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${dateString.split('-').reverse().join('-')}`;
  try {
    const response = await limit(() => axios.get(url));
    const usd = response.data.market_data.current_price.usd;
    const inr = usd * 83;
    cache.set(dateString, inr);
    return inr;
  } catch (error) {
    console.error(`Error fetching price for date ${dateString}:`, error);
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      if (retryAfter) {
        console.log(`Rate limit hit. Retrying after ${retryAfter} seconds.`);
        await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter, 10) * 1000));
        return getBTCINR(date);
      }
    }
    return 83 * 1000000;
  }
}

module.exports = { getBTCINR };