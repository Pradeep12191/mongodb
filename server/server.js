const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
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

app.get('/todos', (req, res) => {

    new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    }).then(() => {
        return Todo.find()
    }).then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err)
    })

})

app.listen(3000, () => {
    console.log('App listening to port 3000 ...')
})

module.exports.app = app;
