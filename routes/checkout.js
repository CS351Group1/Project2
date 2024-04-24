var express = require('express');
const controllerDatabase = require("../controllers/database");
var router = express.Router();

router.get('/', controllerDatabase.autoFill);

router.post('/', controllerDatabase.storeOrder);



module.exports = router;