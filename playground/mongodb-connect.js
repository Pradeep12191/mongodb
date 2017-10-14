const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database TodoApp');
    }
    // db.collection('Todos').insertOne(
    //     {
    //         text: 'Some text',
    //         completed: false
    //     }, (err, result) => {
    //         if (err) {
    //             return console.log('unable to insert doc to the Todos collection.')
    //         }
    //         console.log(JSON.stringify(result.ops, null, 2))
    //     })

    db.collection('Users').insertOne({
        name: 'pradeep',
        age: 25,
        location: 'Chennai',
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert doc to Users collection')
        }
        console.log(JSON.stringify(result.ops, null, 2))
    })

    db.close();
});