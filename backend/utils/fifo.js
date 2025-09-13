module.exports = function computeFIFO(txs, pricesMap) {
    const lots = [];
    const gains = [];
    let net = 0;
  
    for (const tx of txs) {
      const ts = new Date(tx.date).setHours(0, 0, 0, 0);
      const price = pricesMap[ts] || 0;
      const amount = tx.btc || tx.eth || 0;
  
      if (tx.type === 'receive') {
        lots.push({ amount, price, date: tx.date });
      } else {
        let sellQty = amount;
        let sellPrice = price;
        while (sellQty > 0 && lots.length) {
          const lot = lots.shift();
          const useQty = Math.min(sellQty, lot.amount);
          const cost = useQty * lot.price;
          const proceeds = useQty * sellPrice;
          const gain = proceeds - cost;
          gains.push({ date: tx.date, amount: useQty, gain });
          net += gain;
          sellQty -= useQty;
          lot.amount -= useQty;
          if (lot.amount > 0) lots.unshift(lot);
        }
      }
    }
    return { gains, netGain: net, tax: Math.max(0, net * 0.3) };
  };