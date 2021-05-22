const Express = require('express');
const cors = require('cors');

const SellerRoutes = require('../back-end/routes/seller.router');
const BuyerRoutes = require('../back-end/routes/buyer.router');

require('./dal/connection');

const app = new Express();//creating the express server

app.use(cors());//enabling cors policy for transaction between two different ports
app.use(Express.json());//accepting the json data from the request

//mapping the http requests to respective service routes
app.use("/seller",SellerRoutes);
app.use("/buyer",BuyerRoutes);

//assigning the server to a port
app.listen(5000, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Backend Service is running on port 5000...');
});

