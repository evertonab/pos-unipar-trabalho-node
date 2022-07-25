const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if(err) throw err;
        console.log('Connect to MongoDB!!!')
    });

require('./api/models/customer');
require('./api/models/address');

const app = express();
const customerRoutes = require('./api/routes/customers');
const addressRoutes = require('./api/routes/adresses');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = (req, res, next) => {
    const whitelist = [
        'http://localhost:8080'
    ]
    const origin = req.header.origin;
    if(whitelist.indexOf(origin) > 1){
        res.setHeader('Acess-Control-Allow-Origin', '*');
    }
    res.setHeader('Acess-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.setHeader('Acess-Control-Allow-Headers', 'token, Content-type','Authotrization', 'x-acess-token');
    next();
}

app.use(cors);

app.use('/customer', customerRoutes);
app.use('/address', addressRoutes);


app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: 'Hello Word!'
    })
});


app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
}
);

module.exports = app;