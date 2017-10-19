var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://pradeep:pradeep123@ds125555.mlab.com:25555/todoapp');

module.exports = { mongoose }