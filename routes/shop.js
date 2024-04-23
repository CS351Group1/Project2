var express = require("express");
var router = express.Router();

const { ShopItems } = require("../data/shopItems");
// Route to display the shop page
router.get("/", function (req, res, next) {
	res.render("shop", { title: "Shop", ShopItems: ShopItems });
});

router.post("/add-to-cart", function (req, res, next) {
	console.log("Adding to cart, productId:", req.body.productId);
	const productId = parseInt(req.body.productId, 10);
	console.log(ShopItems);
	const product = ShopItems.find((p) => p.id === productId);
	console.log("Found product:", product);
	if (!product) {
		console.error("Product not found");
		return res.redirect("/shop");
	}
	if (!req.session.cart) {
		req.session.cart = [];
	}
	req.session.cart.push(product);
	console.log("Current cart:", req.session.cart);
	res.redirect("/shop");
});

module.exports = router;
