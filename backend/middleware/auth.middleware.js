import jwt from 'jsonwebtoken';
import pool from '../db/db.js';

const verifyToken = async (req,res) => {
    const token = req.headers['access-token'];
    if(!token){
        return res.status(401).json({msg:"Access denied."});
    }
    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        const verifiedId = verified.id;
        return verifiedId;
    } catch (err) {
        res.status(400).json({msg:"Invalid token."});
    }
}

const authMiddleware = {
    verifySeller: async (req,res,next) => {
        const accountId = await verifyToken(req,res);
        pool.query("SELECT * FROM user WHERE id = (?)",[accountId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(400).json({msg:err.message});
            } else {
                if(results[0].role !== "SELLER"){
                    return res.status(403).json({msg:"Access denied."});
                }
                req.loggedInUserId = accountId;
                next();
            }
        })  
    },
    verifyUser: async (req,res,next) => {
        const accountId = await verifyToken(req,res);
        pool.query("SELECT * FROM user WHERE id = (?)",[accountId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(400).json({msg:err.message});
            } else {
                if(results[0].role !== "USER"){
                    return res.status(403).json({msg:"Access denied."});
                }
                req.loggedInUserId = accountId;
                next();
            }
        })  
    },
    verifyMaster: async (req,res,next) => {
        const accountId = await verifyToken(req,res);
        pool.query("SELECT * FROM user WHERE id = (?)",[accountId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(400).json({msg:err.message});
            } else {
                if(results[0].role !== "MASTER"){
                    return res.status(403).json({msg:"Access denied."});
                }
                req.loggedInUserId = accountId;
                next();
            }
        })  
    },
    getAccount: async (req,res,next) => {
        const accountId = await verifyToken(req,res);
        pool.query("SELECT * FROM user WHERE id = (?)",[accountId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(400).json({msg:err.message});
            } else {
                req.loggedInUserId = accountId;
                next();
            }
        })  
    }
}

export default authMiddleware;