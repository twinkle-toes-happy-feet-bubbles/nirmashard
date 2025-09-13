const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const fetchBTCtxs = require('../adapters/bitcoin');
const fetchETHtxs = require('../adapters/ethereum');
const { getBTCINR } = require('../utils/pricefeed');
const computeFIFO = require('../utils/fifo');
const mockTransactions = require('../mocks/transactions');
const mockPrices = require('../mocks/prices');

router.post('/add', async (req, res) => {
    const { address, coin = 'BTC' } = req.body;
    if (!address) return res.status(400).json({ msg: 'Address required' });
    const wallet = await Wallet.create({ address, coin });
    res.json(wallet);
  });

router.get('/:id/report', async (req, res) => {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) return res.status(404).json({ msg: 'Wallet not found' });
  
    try {
      const txs = wallet.coin === 'BTC' ? await fetchBTCtxs(wallet.address) : await fetchETHtxs(wallet.address);
      const priceMap = {};
  
      for (const tx of txs) {
        const date = new Date(tx.date);
        const ts = date.setHours(0, 0, 0, 0);
        try {
          priceMap[ts] = await getBTCINR(date);
        } catch (error) {
          console.error(`Error fetching price for date ${date}:`, error);
          priceMap[ts] = 0; // Fallback to 0 if fetching fails
        }
      }
  
      const report = computeFIFO(txs, priceMap);
      res.json(report);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ msg: 'Failed to generate report' });
    }
  });

  router.get('/:id/report', async (req, res) => {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) return res.status(404).json({ msg: 'Wallet not found' });
  
    const txs = mockTransactions;
    const priceMap = {};
  
    txs.forEach(tx => {
      const date = new Date(tx.date);
      const dateString = date.toISOString().slice(0, 10);
      priceMap[dateString] = mockPrices[dateString] || 8300000; // Default price
    });
  
    const report = computeFIFO(txs, priceMap);
    res.json(report);
  });

module.exports = router;