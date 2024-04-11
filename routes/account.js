var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true }));
const {getCustomers} = require('../controllers/database');   //this will load the controller file below

router.get('/', getCustomers);

module.exports = router;