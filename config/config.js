// NODE_ENV
// we're gonna set this NODE_ENV to 'test' when running test
// heroku will set NODE_ENV to 'production' when deployed
// by default NODE_ENV will be 'developement'
// just include this file in server.js to run the config

// during test, NODE_ENV will set through command line
// export NODE_ENV='test' - linux
// SET NODE_ENV=\"test\" - windows
// then run the mocha command
// so the command will be like below
// export NODE_ENV = test || SET NODE_ENV=\"test\" && mocha server/**/*.test.js

// here NODE_ENV will be set by heroku to 'production' when running the app in production

// MONGODB_URI
// MONGODB_URI also set by heroku,
// since we're not using mlab add-on for heroku we have to manually config MONGODB_URI
// mongo db uri has been created by mlab, in this scenario it is 
// mongodb://pradeep:pradeep123@ds125555.mlab.com:25555/todoapp.
// we've to run the following command to set MONGODB_URI env variable in heroku
// heroku:config MONGODB_URI 'mongodb://pradeep:pradeep123@ds125555.mlab.com:25555/todoapp'

var env = process.env.NODE_ENV || 'developement'

if (env === 'developement') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
    process.env.PORT = 3000;
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

module.exports.config = {}

// if the NODE_ENV is not 'test' or 'developement', heroku will set mongodb_uri for us
