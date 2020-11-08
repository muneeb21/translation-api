
const translate = require('@vitalets/google-translate-api');
const similarLanguagesList=[
    ["hi","kn","bn","gu","pa","ta","te"],
    ["en","cy",],
    ["fr","de","it","es","nl"]
]




const REDIS_PORT = process.env.PORT || 6379;
const redis=require('redis');
// create the redis client
const client = redis.createClient(REDIS_PORT);


const ISO6391 = require('iso-639-1');
// console.log(ISO6391.getName('en')); 



function smartCache(languageCode,text){
 
    console.log("smartcache");
    for(let i=0;i<similarLanguagesList.length;i++){
        let index=similarLanguagesList[i].indexOf(languageCode);
        if(index==-1){
            continue;
        }
         console.log(similarLanguagesList[i]);
         console.log(similarLanguagesList[i].length);
       for(let j=0;j<similarLanguagesList[i].length;j++){
           if(j!=index){
               console.log(similarLanguagesList[i][j]);
            translate(text, {to:similarLanguagesList[i][j] }).then(response => {
                console.log(response.text);
    
                // Set data to Redis
                let key=text+":"+similarLanguagesList[i][j];
                client.setex(key, 2000, response.text);
            
                console.log(`translated to ${similarLanguagesList[i][j]}`,response.from.language.iso);
                          
                
            }).catch(err => {
                console.log('**err**',err);
            });
           }
       }   
        
    }

}

module.exports.translateText= function(req,res){
   
    
    let languageCode= ISO6391.getCode(req.body.language);

    translate(req.body.text, {to: languageCode}).then(response => {
            console.log(response.text);

            smartCache(languageCode,req.body.text);
            
            // Set data to Redis
            let key=req.body.text+":"+languageCode;
            
            
            
            client.setex(key, 2000, response.text);
        
            console.log(`translated to ${req.body.language}`,response.from.language.iso);
            return res.json(200, {
                message: "Here is the translated text",
                data:response.text
            });          
            
        }).catch(err => {
            console.log('********', err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        });

    // translate('I spea Dutch!', {from: 'en', to: language}).then(result => {
    //     console.log(result.text);
    //     //=> Ik spreek Nederlands!
    //     console.log(result.from.text.autoCorrected);
    //     //=> true
    //     console.log(result.from.text.value);
    //     //=> I [speak] Dutch!
    //     console.log(result.from.text.didYouMean);
    //     //=> false
    // }).catch(err => {
    //     console.error(err);
    // });

    
    
    
    
}