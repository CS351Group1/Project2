function addCartToLocals(req, res, next) {
    // Ensure there is a cart object in the session
    if (!req.session.cart) {
        req.session.cart = [];
    }
    
    // Attach cart data for access in views
    res.locals.cart = req.session.cart;
    res.locals.cartCount = req.session.cart.length;

    next();
}

module.exports = addCartToLocals;
