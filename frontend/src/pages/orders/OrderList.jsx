import React, {useEffect,useState,useContext} from "react";
import {Link} from 'react-router-dom';

import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from "../../context/Context.jsx";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";

function OrderList(){

    const [orders,setOrders] = useState([])
    const {roleAndId} = useContext(AuthContext);
    
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await AxiosInstance.get('/orders',{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
                setOrders(res.data)
            } catch (err) {
                alert(err)
            }
        }
        getOrders();
    },[])

    return(
        <Container style = {{textAlign:"center",paddingBlock:5,marginTop:50}}>
                {orders.length === 0 &&(
                    <Row>
                        <p>No orders found.</p>
                        <p>{roleAndId.role === 'SELLER' ? "Create a new product to get orders." : "Buy a product to create one."}</p>
                        <br></br>
                        <Link to = {roleAndId.role === 'SELLER' ? "/create-product" : "/products"}>
                            <Button variant="info" style = {{height:40,borderRadius:10,marginTop:15}} type="button">
                                {roleAndId.role === 'SELLER' ? "Create product" : "Go to products"}
                            </Button>
                        </Link>
                    </Row>
                )}
                <Row>
                    {orders.map((order) => {
                            return <Col key={order.id} md = {orders.length == 2 ? 6 : 4}>
                                <Link to = {`/order/${order.id}`}>
                                    <Card style={{backgroundColor:"#fffefe",width:'18rem',color:'black',marginBottom:'10px',boxShadow:"1px 2px 9px #ddcbcf"}}>
                                        <Card.Body>
                                            <Card.Title style = {{textAlign:'center',marginBottom:3,height:50}}>Order ID: {order.id}</Card.Title>
                                            <Card.Text style = {{textAlign:'left'}}>Product: <b>{order.productName}</b></Card.Text>
                                            <Card.Text style = {{textAlign:'left'}}>Address: <b>{order.address}</b></Card.Text>
                                            <Card.Text style = {{textAlign:'left'}}>Payment method: <b>{order.payment}</b></Card.Text>
                                            <Card.Text style = {{textAlign:'left'}}>Total price: <b>{order.totalPrice}$</b></Card.Text>
                                            <Card.Text style = {{textAlign:'left'}}>Status: <b>{order.status}</b></Card.Text>                                                                 
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                    })}
                </Row>
        </Container>
    )
}

export default OrderList;