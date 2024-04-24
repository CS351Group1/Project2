var express = require('express');
const controllerDatabase = require("../controllers/database");
var router = express.Router();

router.get('/', controllerDatabase.getOrder);


module.exports = router;