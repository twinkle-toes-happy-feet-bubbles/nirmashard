const router = require('express').Router()
const Wallet = require('../models/Wallet');
const fetchBTCtxs = require('../adapters/bitcoin');
const fetchETHtxs = require('../adapters/ethereum');

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

module.exports= router;