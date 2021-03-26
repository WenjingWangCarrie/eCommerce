import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import config from './config';
import bodyParser from 'body-parser'; 

import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from'./routes/orderRoute';
import uploadRoute from './routes/uploadRoute';

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch((error) => console.log("Failed to Connect to Mongodb!"));

const app = express(); 
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
});

/**
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if (product)
        res.send();
    else
        res.status(404).send({msg: "Product Not Found"});
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});
 */