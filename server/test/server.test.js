var expect = require('expect');
var request = require('supertest');
var { ObjectID } = require('mongodb');

var { app } = require('../server');
var { Todo } = require('../models/Todo');

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

// runs before each test case
beforeEach((done) => {
    // clear the collection
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());

    // Todo.insertMany(todos).then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new Todo', (done) => {
        var text = 'Test todo text'
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // making sure the posted data is added in db
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err))
            })
    });

    it('Should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // making sure no data added to db
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            })
    });
});

describe('GET', () => {
    describe('/todos', () => {
        it('Should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2)
                })
                .end(done)
        })
    })

    describe('/todos/:id', () => {
        it('Should get todo doc by id', (done) => {
            var _id = todos[0]._id
            request(app)
                // convert object id to string 
                // using toHexString()
                .get(`/todos/${_id.toHexString()}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end(done)
        })

        it('Should send (404) not found status when id is invalid', (done) => {
            var _id = `${todos[0]._id.toHexString()}11`

            request(app)
                .get(`/todos/${_id}`)
                .expect(404)
                .end(done)
        })

        it('Should send (400) bad request status when id does not exist in db', (done) => {
            var _id = new ObjectID().toHexString();

            request(app)
                .get(`/todos/${_id}`)
                .expect(400)
                .end(done)
        })
    })
})

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var _id = todos[0]._id
        request(app).delete(`/todos/${_id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(_id.toHexString())
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(res.body.todo._id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })
})