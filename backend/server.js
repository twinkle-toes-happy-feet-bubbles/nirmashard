require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('DB COnnected'))
.catch(err=>console.log(err));

app.use('/api/wallet', require('./routes/wallet'));

const PORT = process.env.PORT || 6969;
app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));