const express= require('express');
const router=express.Router();


const Controller= require('../controllers/controller');

router.post('/translate',Controller.translateText);

module.exports=router;