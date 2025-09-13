const router = require('express').Router()

router.get('/', (req, res)=>res.send('wallet route ok'));

module.exports= router;