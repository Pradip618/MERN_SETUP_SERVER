const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURI = require('./config/keys').mongoURI;
const routes = require('./routes/index')

const app = express();


app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );
app.use(bodyParser.urlencoded({
    limit:'50mb',
    extended:false
}))

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
    next()
})
app.use('/api',routes);

Promise.resolve(app)
    .then(MongoDBConnection)
    .catch(err => console.error('MongoDB Connection Error', err))

//Database Connection
async function MongoDBConnection(){

    await mongoose
    .connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected Successfully.')
    })
}

module.exports = app;