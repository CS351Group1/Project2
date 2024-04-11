var express = require('express');
var router = express.Router();

//########################################
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//#########################################

/* GET home page. */


var controllerDatabase = require('../controllers/database');
router.get('/', controllerDatabase.getCustomerss);

router.post("/", controllerDatabase.saveNewCustomer); //see controllers/database.js file

module.exports = router;