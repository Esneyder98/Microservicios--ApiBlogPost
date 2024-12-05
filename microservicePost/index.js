const express = require('express');

const config = require('../config.js');
const post = require('./components/post/network.js')
const errors = require('../network/errors.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port,() =>{
    console.log('Servicio Post listening on port '+config.post.port);
    
})