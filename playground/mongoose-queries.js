var { Todo } = require('../server/models/Todo');
var { mongoose } = require('../server/db/mongoose');
var { ObjectID } = require('mongodb');

const id = '69e62fe15b9b216c420a87fc11';

if(!ObjectID.isValid(id)){
    console.log('id is invalid')
}


// Todo.find({ _id: id }).then((todos) => {
//     console.log(JSON.stringify(todos, null, 2))
// })

// Todo.findOne({ _id: id }).then((todo) => {
//     console.log(todo)
// })

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('No todo')
    }
    console.log(todo)
}).catch((e) => {
    console.log(e)
})

// find(), findOne(), findById()
// id does not exist
// invalid id