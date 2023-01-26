import {Router} from 'express';
import userCtrl from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post("/user/signup",userCtrl.userSignUp);
userRouter.post("/seller/signup",userCtrl.sellerSignUp);
userRouter.post("/login",userCtrl.login);
userRouter.get("/loggedin",userCtrl.loggedIn);

export default userRouter;