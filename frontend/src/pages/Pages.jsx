import React, { useContext } from 'react';
import {Routes,Route} from 'react-router-dom';
import AuthContext from '../context/Context.jsx'

import Home from './common/Home.jsx';
import UserRegister from './auth/UserRegister.jsx';
import SellerRegister from './auth/SellerRegister.jsx';
import Login from './auth/Login.jsx';
import ProductList from './products/ProductList.jsx';
import Product from './products/Product.jsx';
import ProductForm from './products/ProductForm.jsx';
import OrderList from './orders/OrderList.jsx';
import Order from './orders/Order.jsx';

function Pages() {
    
    const {loggedIn} = useContext(AuthContext);
    const {roleAndId} = useContext(AuthContext);

    return(
        <Routes>
            {loggedIn === false &&(
                <>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/register/user" element = {<UserRegister/>}/>
                    <Route path = "/register/seller" element = {<SellerRegister/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                </>
            )}
            {loggedIn === true &&(
                <>
                    <Route path = "/products" element = {<ProductList/>}/>
                    <Route path = "/product/:id" element = {<Product/>}/>
                    <Route path = "/orders" element = {<OrderList/>}/>
                    <Route path = "/order/:id" element = {<Order/>}/>
                    {roleAndId.role === "MASTER" &&(
                        <>
                        
                        </>
                    )}
                    {roleAndId.role === "CLIENT" &&(
                        <>
                        
                        </>
                    )}
                    {roleAndId.role === "SELLER" &&(
                        <>
                            <Route path = "/create-product" element = {<ProductForm/>}/>
                            <Route path = "/update-product/:id" element = {<ProductForm/>}/>
                            <Route path = "/products/:sellerId" element = {<ProductList/>}/>
                        </>
                    )}
                </>
            )}
        </Routes>
    )
}

export default Pages;