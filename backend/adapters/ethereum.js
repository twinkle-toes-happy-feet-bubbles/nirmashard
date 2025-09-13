const axios = require('axios');
const {eth} = require('../utils/rateLimit');
module.exports = async function fetchETHtxs(address){
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const {data} = await eth(()=>axios.get(url));
  return data.result.map(tx=>{
    const isSent = tx.from.toLowerCase()===address.toLowerCase();
    return { 
        txid: tx.hash, 
        date: new Date(tx.timeStamp*1000), 
        eth: parseFloat(tx.value)/1e18, 
        type: isSent?'send':'receive' 
    };
  });
};