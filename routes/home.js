var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
    // Retrieve items from the session, or use an empty array if none exist
    res.render("home")
});


module.exports = router;