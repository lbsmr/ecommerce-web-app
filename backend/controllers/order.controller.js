import pool from "../db/db.js";
import jwt_decode from 'jwt-decode';

const orderCtrl = {
    createOrder: async (req,res) => {
        const {productName,sellerId,address,payment,nameOnCard,expiration,cvv,creditNumber,totalPrice} = req.body;
        const token = jwt_decode(req.headers['access-token']);
        const buyerId = token.id;
        if(!address || !payment){
            return res.status(400).json({msg:"All fields must be entered."});
        }

        switch(payment){
            case 'Cash':
                    pool.query("INSERT INTO `order`(buyerId,sellerId,productName,address,payment,totalPrice) VALUES (?,?,?,?,?,?)",[buyerId,sellerId,productName,address,payment,totalPrice], async (err,results) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg:err.message});
                    } else {
                        return res.status(200).json({msg:"Order created."});
                    }
                })
                break;
            case 'Debit':
                if(!nameOnCard || !expiration || !cvv){
                    return res.status(400).json({msg:"All fields must be entered."});
                }
                pool.query("INSERT INTO `order`(buyerId,sellerId,productName,address,payment,nameOnCard,expiration,cvv,totalPrice) VALUES (?,?,?,?,?,?,?,?,?)",[buyerId,sellerId,productName,address,payment,nameOnCard,expiration,cvv,totalPrice], async (err,results) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg:err.message});
                    } else {
                        return res.status(200).json({msg:"Order created."});
                    }
                })
                break;
            case 'Credit':
                if(!nameOnCard || !expiration || !cvv || !creditNumber){
                    return res.status(400).json({msg:"All fields must be entered."});
                }
                pool.query("INSERT INTO `order`(buyerId,sellerId,productName,address,payment,nameOnCard,expiration,cvv,creditNumber,totalPrice) VALUES (?,?,?,?,?,?,?,?,?,?)",[buyerId,sellerId,productName,address,payment,nameOnCard,expiration,cvv,creditNumber,totalPrice], async (err,results) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({msg:err.message});
                    } else {
                        return res.status(200).json({msg:"Order created."});
                    }
                })
                break;
        }
    },
    getOrders: async (req,res) => {
        const token = jwt_decode(req.headers['access-token']);

        pool.query("SELECT * FROM user WHERE id = (?)",[token.id], async (err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results[0].role === "CLIENT"){
                    pool.query("SELECT * FROM `order` WHERE buyerId = (?)",[results[0].id], async (err,results) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({msg:err.message});
                        } else {
                            if(results.affectedRows === 0){
                                return res.status(404).json({msg:"No orders found."});
                            }
                            return res.status(200).json(results);
                        }
                    })
                } else if (results[0].role === "SELLER"){
                    pool.query("SELECT * FROM `order` WHERE sellerId = (?)",[results[0].id], async (err,results) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({msg:err.message});
                        } else {
                            if(results.affectedRows === 0){
                                return res.status(404).json({msg:"No orders found."});
                            }
                            return res.status(200).json(results);
                        }
                    })
                }
            }
        })
    },
    getOrder: async (req,res) => {
        const orderId = req.params.id;

        pool.query("SELECT * FROM `order` WHERE id = (?)",[orderId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results.affectedRows === 0){
                    return res.status(404).json({msg:"No order found."});
                }
                return res.status(200).json(results);
            }
        })
    },
    updateOrder: async (req,res) => {
        const orderId = req.params.id;
        const status = req.body.status;

        pool.query("UPDATE `order` SET status = IFNULL(?, status) WHERE id = (?)",[status,orderId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results.affectedRows === 0){
                    return res.status(404).json({msg:"No order found."});
                }
                return res.status(200).json({msg:"Order status updated."});
            }
        })
    }
}

export default orderCtrl;