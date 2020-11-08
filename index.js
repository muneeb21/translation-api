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
// console.log(ISO6391.getCode('tamil'));
// console.log(ISO6391.getCode('gujrati'));
// console.log(ISO6391.getCode('panjabi'));
// console.log(ISO6391.getCode('bangali'));
// console.log(ISO6391.getCountry('Tm'));
// const LanguageDetect = require('languagedetect');
// const lngDetector = new LanguageDetect();
 

 
// console.log(lngDetector.detect('hello',7));

// var CountryLanguage = require('country-language');
// console.log(CountryLanguage.getCountryCodes());

// CountryLanguage.getLanguage('hi', function (err, language) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(language.countries);
//     }
//   });

  // CountryLanguage.getCountry('bel', function (err, country) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     var languagesInGB = country.languages;
  //     console.log(languagesInGB);
  //   }
  // })


// CountryLanguage.getLanguageCountries('kn', function (err, countries) {
//     if (err) {
//       console.log(err);
//     } else {
//       countries.forEach(function (countryCodes) {
//         console.log(countryCodes);
//       });
//     }
//   });


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
