var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoUri = process.env.MONGODB_URI;

console.log(`Database uri is ${mongoUri}`)

mongoose.connect(mongoUri, { useMongoClient: true });

module.exports = { mongoose }