var expect = require('expect');
var request = require('supertest');

var { app } = require('../server');
var { Todo } = require('../models/Todo');

const todos = [{ text: 'watch tv' }, { text: 'jogging' }]

//runs before each test case
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
                Todo.find({text}).then((todos) => {
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

describe('GET /todos', () => {
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