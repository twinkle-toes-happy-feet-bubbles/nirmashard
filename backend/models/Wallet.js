const mongoose = require('mongoose');
const { type } = require('os');
const WalletSchema = new mongoose.Schema({
    address:String,
    coin:{type: String, enum:['BTC', 'ETH'], defaut:'BTC'},
    createdAt: {type:Date, default:Date.now}
});

module.exports=mongoose.model('Wallet', WalletSchema)