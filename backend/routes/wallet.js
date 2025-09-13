const router = require('express').Router()
const Wallet = require('../models/Wallet');
const fetchBTCtxs = require('../adapters/bitcoin');
const fetchETHtxs = require('../adapters/ethereum');
const {getBTCINR} = require('../utils/pricefeed');
const computeFIFO = require('../utils/fifo');


router.post('/add', async(req,res)=>{
 const { address, coin='BTC'}= req.body;
 if(!address) return res.status(400).json({msg:"Address required"});
 const wallet = await Wallet.create({address, coin});
 res.json(wallet);
})

router.get('/:id/txs', async (req,res)=>{
    const wallet = await Wallet.findById(req.params.id);
    if(!wallet) return res.status(404).json({msg:'Wallet not found'});
    const txs = wallet.coin==='BTC' ? await fetchBTCtxs(wallet.address) : await fetchETHtxs(wallet.address);
    res.json(txs);
});

router.get('/:id/report', async (req,res)=>{
    const wallet = await Wallet.findById(req.params.id);
    const txs = await (wallet.coin==='BTC'?fetchBTCtxs(wallet.address):fetchETHtxs(wallet.address));
    const priceMap = {};
    for(const tx of txs){
        const d = new Date(tx.date);
        priceMap[d.setHours(0,0,0,0)] = await getBTCINR(d);
    }
    const report = computeFIFO(txs,priceMap);
    res.json(report);
  });

module.exports= router;