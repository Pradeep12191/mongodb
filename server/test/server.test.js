var expect = require('expect');
var request = require('supertest');

var { app } = require('../server');
var { Todo } = require('../models/Todo');

//runs before each test case
beforeEach((done) => {
    // clear the collection
    Todo.remove({}).then(() => done())
})

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
                Todo.find().then((todos) => {
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
            .end((err, res ) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e))
            })
    });
})