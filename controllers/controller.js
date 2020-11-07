
const translate = require('@vitalets/google-translate-api');


const ISO6391 = require('iso-639-1');
// console.log(ISO6391.getName('en')); 

module.exports.translateText= function(req,res){
   
    console.log(req);
    console.log(req.cache);
    let language= ISO6391.getCode(req.body.language);

    translate(req.body.text, {to: language}).then(response => {
            console.log(response.text);
        
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