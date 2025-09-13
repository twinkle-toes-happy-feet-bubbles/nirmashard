const router = require('express').Router()
const Wallet = require('../models/Wallet');

router.post('/add', async(req,res)=>{
 const { address, coin='BTC'}= req.body;
 if(!address) return res.status(400).json({msg:"Address required"});
 const wallet = await Wallet.create({address, coin});
 res.json(wallet);
})

module.exports= router;