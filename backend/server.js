import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import orderRouter from './routes/order.router.js';

config();
const app = express();
app.use(cors({
    origin:["http://127.0.0.1:5173"],
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

app.set('port',process.env.PORT);
app.listen(app.get('port'),() => {
    console.log('Server is on port: ' + app.get('port'));
});

app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);