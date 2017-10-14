const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database TodoApp');
    }
    //delete many
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    //deletedOne()
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    //findOneAndDelete()
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result.value);
    // })

    // db.collection('Users').deleteMany({name: 'pradeep'}).then((result) => {
    //     console.log(result)
    // })

    db.collection('Users').findOneAndDelete({ _id: new ObjectID("59e1c60f17de32309b8c623f") })
        .then((result) => {
            console.log(result)
        })

    // db.close();
});