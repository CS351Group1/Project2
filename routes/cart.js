var express = require("express");
var router = express.Router();

// Route to display the cart page
router.get("/", function (req, res, next) {
	// Retrieve items from the session, or use an empty array if none exist
	const items = req.session.cart || [];

	// Calculate the total price of the items
	const totalPrice = items.reduce((total, item) => {
		return total + item.price * 1;
	}, 0);

	// Render the cart view, passing items and total price
	res.render("cart", {
		items: items,
		totalPrice: totalPrice,
	});
});

module.exports = router;
