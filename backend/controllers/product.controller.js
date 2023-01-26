import pool from "../db/db.js";
import jwt_decode from 'jwt-decode';

const productCtrl = {
    createProduct: async (req,res) => {
        const {name,description,price,image} = req.body;
        const token = jwt_decode(req.headers['access-token']);
        const sellerId = token.id;
        if(!name || !description || !price || !image){
            return res.status(400).json({msg:"All fields must be entered."});
        }
        if(name.length > 100){
            return res.status(400).json({msg:"Product name too long."});
        }
        if(description.length > 75){
            return res.status(400).json({msg:"Product description too long."});
        }
        if(!sellerId){
            return res.status(400).json({msg:"No seller Id provided."})
        }
        pool.query("INSERT INTO product(name,description,price,image,sellerId) VALUES (?,?,?,?,?)",[name,description,price,image,sellerId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                return res.status(200).json({msg:"Product created."});
            }
        })
    },
    updateProduct: async (req,res) => {
        const productId = req.params.id;
        const {name,description,price,image} = req.body;
        pool.query("UPDATE product SET name = IFNULL(?, name), description = IFNULL(?, description), price = IFNULL(?, price), image = IFNULL(?, image) WHERE id = (?)", [name,description,price,image,productId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results.affectedRows === 0){
                    return res.status(404).json({msg:"Product not found."});
                }
                return res.status(200).json({msg:"Product updated."});
            }
        })
    },
    deleteProduct: async (req,res) => {
        const productId = req.params.id;
        pool.query("DELETE FROM product WHERE id = (?)",[productId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results.affectedRows === 0){
                    return res.status(404).json({msg:"Product not found."});
                }
                return res.status(200).json({msg:"Product deleted."});
            }
        })
    },
    getProducts: async (req,res) => {
        pool.query("SELECT * FROM product", async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results.affectedRows === 0){
                    return res.status(404).json({msg:"No products found."});
                }
                return res.status(200).json(results);
            }
        })
    },
    getProduct: async (req,res) => {
        const productId = req.params.id;
        pool.query("SELECT * FROM product WHERE id = (?)",[productId], async (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({msg:err.message});
            } else {
                if(results.affectedRows === 0){
                    return res.status(404).json({msg:"No product found."});
                }
                return res.status(200).json(results);
            }
        })
    }
}

export default productCtrl;