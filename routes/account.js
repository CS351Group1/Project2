var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true }));
const {verifyLogin} = require('../controllers/database');

router.get('/', verifyLogin);
router.post("/getemail", function (req, res, next) {
    // Retrieve items from the session, or use an empty array if none exist
    req.session.nameoremail = req.body.nameoremail;
    console.log("Current user:", req.session.nameoremail);
    res.redirect("/shop");
});

module.exports = router;