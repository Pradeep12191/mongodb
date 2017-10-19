const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

var port = process.env.PORT || 3000

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
    if(!ObjectID.isValid(_id)){
        return res.status(404).send()
    }
    Todo.findById({_id}).then((todo) => {
        if(!todo){
            // respond with no body
            return res.status(400).send()
        }
        res.send({todo})
    }, (err) => {
        res.status(400).send(err);
    })
    // res.send(req.params)
})

app.get('/todos', (req, res) => {

    new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    }).then(() => {
        return Todo.find()
    }).then((todos) => {
        res.send({ todos })
    }, (err) => {
        res.status(400).send(err)
    })
})


app.listen(port, () => {
    console.log(`App listening to port ${port} ...`)
})

module.exports.app = app;
