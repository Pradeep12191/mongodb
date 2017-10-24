var { Todo } = require('../server/models/Todo');
var { mongoose } = require('../server/db/mongoose');
var { ObjectID } = require('mongodb');

var _id = 'id'
//remove all docs in todo collection
Todo.remove({})

// find a doc by its id and remove and also get the doc
Todo.findByIdAndRemove('id').then((todo) => {

})

Todo.findById({_id}).then((todo) => {

})