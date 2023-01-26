import {Router} from 'express';
import productCtrl from '../controllers/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const productRouter = Router();

productRouter.post("/create-product", authMiddleware.verifySeller, productCtrl.createProduct);
productRouter.patch("/update-product/:id", authMiddleware.verifySeller, productCtrl.updateProduct);
productRouter.delete("/delete-product/:id", authMiddleware.verifySeller, productCtrl.deleteProduct);
productRouter.get("/products", authMiddleware.getAccount, productCtrl.getProducts);
productRouter.get("/product/:id", authMiddleware.getAccount, productCtrl.getProduct);

export default productRouter;