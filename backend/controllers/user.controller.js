import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import pool from '../db/db.js'

const userCtrl = {
    userSignUp: async (req,res) => {
        let {email,name,password} = req.body;

        if(!email || !password || !name){
            return res.status(400).json({msg:"All fields must be entered."});
        }
        pool.query("SELECT email FROM user WHERE email = ?",[email], async (err,results) => {
            if(err){
                console.log(err)
            } else {
                if(results.length > 0){
                    return res.status(400).json({msg:"Email is already in use."});
                }
                if(email.length > 100){
                    return res.status(400).json({msg:"Email is too long."})
                }
                if(password.length <= 7 || password.length > 255){
                    return res.status(400).json({msg:"Password needs to be between 8 and 255 characters long."});
                }
                if(name.length > 50){
                    return res.status(400).json({msg:"Name is too long."})
                }
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                pool.query("INSERT INTO user(email,name,password,role) VALUES (?,?,?,?)",[email,name,passwordHash,'CLIENT'],(err,results) => {
                    if(err){
                        console.log(err)
                    } else {
                        pool.query("SELECT * FROM user WHERE email = (?)", [email], async (err,results) => {
                            if(err){
                                console.log(err)
                            } else {
                                if(results.length === 0){
                                    return res.status(400).json({msg:"No user exists with that email."});
                                } 
                                const token = jwt.sign({id:results[0].id,role:'CLIENT'},process.env.JWT_SECRET);
                                return res.status(200).json({
                                    "token": token
                                });
                            }
                        })
                    }
                })
            }
        })
    },
    sellerSignUp: async (req,res) => {
        let {email,name,password,bankName,bankAccountNumber,bankAddress} = req.body;

        if(!email || !password || !name || !bankName || !bankAccountNumber || !bankAddress){
            return res.status(400).json({msg:"All fields must be entered."});
        }
        pool.query("SELECT email FROM user WHERE email = ?",[email], async (err,results) => {
            if(err){
                console.log(err)
            } else {
                if(results.length > 0){
                    return res.status(400).json({msg:"Email is already in use."});
                }
                if(email.length > 100){
                    return res.status(400).json({msg:"Email is too long."})
                }
                if(password.length <= 7 || password.length > 255){
                    return res.status(400).json({msg:"Password needs to be atleast 8 characters long."});
                }
                if(name.length > 50){
                    return res.status(400).json({msg:"Name is too long."})
                }
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                pool.query("INSERT INTO user(email,name,password,role,bankName,bankAccountNumber,bankAddress) VALUES (?,?,?,?,?,?,?)",[email,name,passwordHash,'SELLER',bankName,bankAccountNumber,bankAddress],(err,results) => {
                    if(err){
                        console.log(err)
                    } else {
                        pool.query("SELECT * FROM user WHERE email = (?)", [email], async (err,results) => {
                            if(err){
                                console.log(err)
                            } else {
                                if(results.length === 0){
                                    return res.status(400).json({msg:"No user exists with that email."});
                                } 
                                const token = jwt.sign({id:results[0].id,role:'SELLER'},process.env.JWT_SECRET);
                                return res.status(200).json({
                                    "token": token
                                });
                            }
                        })
                    }
                })
            }
        })
    },
    login: async (req,res) => {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg:"All fields must be entered."});
        }
        pool.query("SELECT * FROM user WHERE email = ?",[email], async (err,results) => {
            if(err){
                console.log(err)
            } else {
                if(results.length === 0){
                    return res.status(400).json({msg:"No user exists with that email."});
                } 
                const isMatch = await bcrypt.compare(password,results[0].password);
                if(!isMatch){
                    return res.status(400).json({msg:"Wrong credentials."});
                } else {
                    const token = jwt.sign({id: results[0].id,role:results[0].role},process.env.JWT_SECRET);
                    return res.status(200).json({
                        "token": token
                    });
                }
            }
        })
    },
    loggedIn: async (req,res) => {
        try{
            const token = req.header('access-token');
            if(!token){
                return res.json(false);
            }
            jwt.verify(token,process.env.JWT_SECRET);
            res.send(true);
        }catch(err){
            res.json({err:err.message});
        }
    }
}

export default userCtrl;