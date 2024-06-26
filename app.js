var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path=require('path');
var addCartToLocals = require('./middlewares/addCartToLocals');

var homeRouter=require('./routes/home')
var createRouter = require('./routes/createaccount');
var accountRouter = require('./routes/account');
var checkoutRouter=require('./routes/checkout')
var usersRouter = require('./routes/users');
var shopRouter = require('./routes/shop');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));

// Session middleware
const session = require('express-session');
app.use(session({
    secret: 'gfdfg443huj', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(addCartToLocals);

app.use('/', homeRouter);
app.use('/create', createRouter);
app.use('/account', accountRouter);
app.use('/checkout', checkoutRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/cart', cartRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
