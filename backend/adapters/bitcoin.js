const axios = require('axios');
const {btc} = require('../utils/rateLimit');
module.exports = async function fetchBTCtxs(address){
  const url = `https://blockstream.info/api/address/${address}/txs`;
  const {data} = await btc(()=>axios.get(url));
  return data.map(tx=>{
    const received = tx.vout.some(v=>v.scriptpubkey_address===address);
    const sent = tx.vin.some(v=>v.prevout?.scriptpubkey_address===address);
    const value = received ? tx.vout.find(v=>v.scriptpubkey_address===address).value : tx.vin.find(v=>v.prevout?.scriptpubkey_address===address).prevout.value;
    return { 
        txid: tx.txid, 
        date: new Date(tx.status.block_time*1000), 
        btc: value/1e8, 
        type: sent?'send':'receive' 
    };
  });
};