const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database TodoApp');
    }

    // db.collection('Todos').findOneAndUpdate(
    //     { _id: new ObjectID("59e1cd6d17de32309b8c6500") },
    //     { $set: { completed: true } },
    //     { returnOriginal: false }).then((result) => {
    //         console.log(result);
    //     })

    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID("59e1c60717de32309b8c623b")
        },
        {
            $set: { name: 'prady' },
            $inc: { age: 2 }
        },
        {
            returnOriginal: false
        }).then((res) => {
            console.log(res)
        })

    // db.close();
});