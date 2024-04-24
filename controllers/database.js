var { uri } = require('./databaseConnection');

//Define some varibles needed for the database Controller functions
const { MongoClient, ServerApiVersion } = require('mongodb');

//connection string, fill it in with YOUR information for your MongoDB deployment
//const uri = "mongodb+srv://grewe:jority";


// SETP 1: Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/* STEP 2: Controller function to save New customer data to the collection customers. */
module.exports.saveNewCustomer =  function(req, res, next) {

    //step 2.1 Read in the incomming form data for the customer: name, email
    //expecting data variable called name --retrieve value using body-parser
    var value_name = req.body.username;  //retrieve the data associated with name
    var value_email = req.body.email;  //retrieve the data associated with email
    var value_password = req.body.password;  //retrieve the data associated with email
    var value_street = req.body.street;  //retrieve the data associated with name
    var value_city = req.body.city;  //retrieve the data associated with email
    var value_state = req.body.state;  //retrieve the data associated with email
    var value_zip = req.body.zip;  //retrieve the data associated with email
    var value_phone = req.body.phone;  //retrieve the data associated with email


    console.log("NEW Customer Data  " + value_name + "  email: " + value_email);

    //step 2.2 Call the function defined below that will connect to your MongDB collection and create a new customer
    saveCustomerToMongoDB(value_name, value_email, value_password, value_street, value_city, value_state, value_zip, value_phone);

    res.render("created");

};


/**
 * This is the main function save to your definde MongoClient defined at the top
 * which connects to your database here defined as "shoppingsite" and in it will access
 * the collection "customers" to create a new Customer with the name and email
 * NOTE: no check if the user already exists (with this email) is done BUT, SHOULD BE DONE
 * @param name
 * @param email
 * @returns {Promise<void>}
 */
async function saveCustomerToMongoDB(value_name, value_email, value_password, value_street, value_city, value_state, value_zip, value_phone) {
    try {

        //STEP A: Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shippingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('users');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        //STEP E: insert the new customer and display in console the new # documents in customers
        console.log("Insert new customer");
        await customersCollection.insertOne({"username": value_name, "email": value_email, "password": value_password, "ship_housenumstreet": value_street, "ship_city": value_city, "ship_state": value_state, "ship_zip": value_zip, "ship_phone": value_phone });
        console.log("  # documents now = " + await customersCollection.countDocuments());



    } finally {
        // STEP F: Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports.verifyLogin= async function(req, res, next){
    try {
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shippingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('users');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        const customerListCursor=customersCollection.find();
        const customerList=await customerListCursor.toArray();

        res.render("account", {customerList: customerList})
    }catch(error){
        console.error("Not able to get customers")
    }finally{
        await client.close();

    }
}


module.exports.newAccount= async function(req, res, next){
    try {
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shippingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('users');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        const customerListCursor=customersCollection.find();
        const customerList=await customerListCursor.toArray();

        res.render('createaccount', {title:'customerList', customerList})
    }catch(error){
        console.error("Not able to get customers")
    }finally{
        await client.close();
    }
}

module.exports.autoFill= async function(req, res, next){
    try {
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shippingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('users');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        const customerListCursor=customersCollection.find();
        const customerList=await customerListCursor.toArray();

        const items = req.session.cart || [];

        // Calculate the total price of the items
        const totalPrice = items.reduce((total, item) => {
            return total + item.price * 1;
        }, 0);

        res.render('checkout', {title:'customerList', customerList, nameoremail:req.session.nameoremail, items: items,
            totalPrice: totalPrice,})
    }catch(error){
        console.error("Not able to get customers")
    }finally{
        await client.close();
    }
}

module.exports.getOrder= async function(req, res, next){
    try {
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shippingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('orders');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        const customerListCursor=customersCollection.find();
        const customerList=await customerListCursor.toArray();

        const items = req.session.cart || [];

        // Calculate the total price of the items
        const totalPrice = items.reduce((total, item) => {
            return total + item.price * 1;
        }, 0);

        res.render('order', {title:'customerList', customerList, nameoremail:req.session.nameoremail, items: items,
            totalPrice: totalPrice,})
    }catch(error){
        console.error("Not able to get orders")
    }finally{
        await client.close();
    }
}

module.exports.storeOrder =  function(req, res, next) {

    //step 2.1 Read in the incomming form data for the customer: name, email
    //expecting data variable called name --retrieve value using body-parser
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var value_name = req.body.username;  //retrieve the data associated with name
    var value_email = req.body.email;  //retrieve the data associated with email
    var value_password = req.body.password;  //retrieve the data associated with email
    var value_street = req.body.street;  //retrieve the data associated with name
    var value_city = req.body.city;  //retrieve the data associated with email
    var value_state = req.body.state;  //retrieve the data associated with email
    var value_zip = req.body.zip;  //retrieve the data associated with email
    var value_phone = req.body.phone;  //retrieve the data associated with email
    var value_card = req.body.card_num;  //retrieve the data associated with email
    var value_cvv = req.body.cvv;  //retrieve the data associated with email
    var value_exp = req.body.exp;  //retrieve the data associated with email


    console.log("NEW Customer Data  " + value_name + "  email: " + value_email);
    const items = req.session.cart || [];

    // Calculate the total price of the items
    const totalPrice = items.reduce((total, item) => {
        return total + item.price * 1;
    }, 0);
    //step 2.2 Call the function defined below that will connect to your MongDB collection and create a new customer
    saveOrderToMongoDB(value_name, value_email, value_password, value_street, value_city, value_state, value_zip, value_phone, value_card, value_cvv, value_exp, items, totalPrice);
    res.render('order', {name: value_name, email:value_email, street:value_street, city:value_city, state:value_state, zip:value_zip, phone:value_phone, items:items, price:totalPrice});

};


/**
 * This is the main function save to your definde MongoClient defined at the top
 * which connects to your database here defined as "shoppingsite" and in it will access
 * the collection "customers" to create a new Customer with the name and email
 * NOTE: no check if the user already exists (with this email) is done BUT, SHOULD BE DONE
 * @param name
 * @param email
 * @returns {Promise<void>}
 */
async function saveOrderToMongoDB(value_name, value_email, value_password, value_street, value_city, value_state, value_zip, value_phone, value_card, value_cvv, value_exp, items, totalPrice) {
    try {

        //STEP A: Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //STEP B:  Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        //STEP C: connect to the database "shoppingsite"
        var db0 = client.db("shippingsite"); //client.db("shoppingsite");
        console.log("got shopping site");
        console.log("db0" + db0.toString());

        //STEP D: grab the customers collection
        var customersCollection =  db0.collection('orders');
        console.log("collection is "+ customersCollection.collectionName);
        console.log(" # documents in it " + await customersCollection.countDocuments());

        //STEP E: insert the new customer and display in console the new # documents in customers
        console.log("Insert new order");

        await customersCollection.insertOne({"username": value_name, "email": value_email, "password": value_password, "ship_housenumstreet": value_street, "ship_city": value_city, "ship_state": value_state, "ship_zip": value_zip, "ship_phone": value_phone, "products": items, "total_price": totalPrice  });
        console.log("  # documents now = " + await customersCollection.countDocuments());



    } finally {
        // STEP F: Ensures that the client will close when you finish/error
        await client.close();
    }
}