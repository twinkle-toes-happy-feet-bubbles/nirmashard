const pLimit = require('p-limit').default || require('p-limit');
module.exports = { btc: pLimit(1), eth: pLimit(5) };