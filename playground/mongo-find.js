var { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to TodoApp database')
    }

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, null, 2));
    // })

    db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch docs', err)
    })

    
    db.collection('Todos').find({_id: new ObjectID('59e1bdd79369c30ce4d96ce3')}).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch docs', err)
    })

    db.collection('Users').find().count().then((count) => {
        console.log(count);
    }, () => {

    })
});