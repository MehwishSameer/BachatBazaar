const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const db = require('./models');

const userRouter = require('./routes/Users');
app.use('/users', userRouter);

const productRouter = require('./routes/Products');
app.use('/products', productRouter);

const cartRouter = require('./routes/Carts');
app.use('/carts', cartRouter);

const orderRouter = require('./routes/Orders');
app.use('/orders', orderRouter);

const purchaseRouter = require('./routes/Purchases');
app.use('/purchases', purchaseRouter);

const locationRouter = require('./routes/Locations');
app.use('/locations', locationRouter);

db.sequelize.sync().then(() => {
app.listen(3002, () => {
    console.log(`Server started on port 3002`);
});
});
