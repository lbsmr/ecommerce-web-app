import {Router} from 'express';
import orderCtrl from '../controllers/order.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const orderRouter = Router()

orderRouter.post("/create-order",authMiddleware.getAccount,orderCtrl.createOrder);
orderRouter.get("/orders",authMiddleware.getAccount,orderCtrl.getOrders);
orderRouter.get("/order/:id",authMiddleware.getAccount,orderCtrl.getOrder);
orderRouter.patch("/update-order/:id",authMiddleware.getAccount,orderCtrl.updateOrder)

export default orderRouter;