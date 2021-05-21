const Express = require('express');
const cors = require('cors');

const SellerRoutes = require('../back-end/routes/seller.router');
const BuyerRoutes = require('../back-end/routes/buyer.router');

require('./dal/connection');

const app = new Express();
app.use(cors());
app.use(Express.json());

app.use("/seller",SellerRoutes);
app.use("/buyer",BuyerRoutes);


app.listen(5000, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Backend Service is running on port 5000...');
});

