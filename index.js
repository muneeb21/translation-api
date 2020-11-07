const express = require('express');
const app = express();
// const port = 8000;




app.use(express.urlencoded());

// const chardet = require('chardet');
// console.log(chardet.analyse(Buffer.from('hello everyone')));


// use express router
app.use('/', require('./routes'));


// const LanguageDetect = require('languagedetect');
// const lngDetector = new LanguageDetect();
// console.log(lngDetector.detect('bonjour'));

// const ISO6391 = require('iso-639-1');
// console.log(ISO6391.getCode('Tamil')); 

const port =  8000;

// const translate = require('@vitalets/google-translate-api');
// translate("namaskar", {to: 'kn'}).then(response => {
//     console.log(response.text);
    
//     //=> I speak English
//     console.log("translated to english",response.from.language.iso);
//     //=> nl
// }).catch(err => {
//     console.error('**************',err);
// });

// translate("I speak english", {to: "nl"}).then(response => {
//     console.log(response.text);
// }).catch(err => {
//     console.error(err);
// });


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
