const express = require('express');
const redis = require('redis');
const app = express();

const port = 8000;

const REDIS_PORT = process.env.PORT || 6379;

// create the redis client
const client = redis.createClient(REDIS_PORT);

app.use(express.urlencoded());


// use express router
app.use('/', require('./routes'));


// const ISO6391 = require('iso-639-1');
// console.log(ISO6391.getCode('Tamil')); 

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
