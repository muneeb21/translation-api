const REDIS_PORT = process.env.PORT || 6379;
const redis=require('redis');
// create the redis client
const client = redis.createClient(REDIS_PORT);

const ISO6391 = require('iso-639-1');

module.exports.cache=function (req, res, next) {
  
  let languageCode= ISO6391.getCode(req.body.language);
  
  let key=req.body.text+":"+languageCode;
    
    client.get(key, (err, data) => {
      if (err) throw err;
  
      if (data !== null) {
          console.log("middleware used");
        return res.json(200, {
            message: "Here is the translated text",
            data:data
        }); 
      } else {

        next();
      }
    });
  }