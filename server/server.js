var config = require('../config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

var port = process.env.PORT;
// var nodeEnv = process.env.NODE_ENV;

console.log('node environment', process.env.MONGODB_URI);

const todos = [
    {
        _id: new ObjectID(),
        text: 'watch tv'
    },
    {
        _id: new ObjectID(),
        text: 'jogging'
    }
]
// Todo.insertMany(todos).then((result) => {
//     console.log(result)
// })
// Todo.remove({}).then((result) => {
//     console.log(result)
// })

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `https://still-dusk-98367.herokuapp.com/${port}`);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})



app.post('/todos', (req, res) => {
    console.log(req.body.text)
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    // need to check the id is valid
    // handle if id does not exist in db
    var _id = req.params['id'];
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send()
    }
    Todo.findById({ _id }).then((todo) => {
        if (!todo) {
            // respond with no body
            return res.status(400).send()
        }
        res.send({ todo })
    }, (err) => {
        res.status(400).send(err);
    })
    // res.send(req.params)
})

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send({ todos })
    }).catch((err) => {
        res.status(400).send(err)
    })

    // new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve()
    //     }, 3000)
    // }).then(() => {
    //     return Todo.find()
    // }).then((todos) => {
    //     res.send({todos})
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })

})

app.delete('/todos/:id', (req, res) => {
    var _id = req.params.id

    if (!ObjectID.isValid(_id)) {
        return res.status(400).send();
    }

    Todo.findByIdAndRemove(_id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.status(200).send({ todo })
    }).catch((err) => {
        res.status(400).send()
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params['id'];
    var body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null
    }

    console.log(id)
    console.log(JSON.stringify(body, null, 2))

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        // if(!todo){
        //     res.status(404).send();
        // }
        res.send({todo})
    })
    .catch((e) => {
        res.status(400).send();
    })
})


app.listen(port, () => {
    console.log(`App listening to port ${port} ...`)
})

module.exports.app = app;
