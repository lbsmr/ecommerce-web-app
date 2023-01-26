import React, {useEffect,useState,useContext} from "react";
import {useParams} from 'react-router-dom';

import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from "../../context/Context.jsx";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

function Order(){
    const {id} = useParams();
    const {roleAndId} = useContext(AuthContext);
    const [order,setOrder] = useState({})

    useEffect(() => {
        const getOrder = async () => {
            await AxiosInstance.get(`/order/${id}`,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
                console.log(results)
                setOrder(results.data[0])
            }).catch(err => {
                console.log(err);
            });
        }
        getOrder();
    },[])

    const updateOrder = async () => {
        try {
            await AxiosInstance.patch(`/update-order/${id}`,{...order},{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
            window.location.href = `/order/${id}`
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <Container>
            <Row>
                <Card style={{backgroundColor:"#fffefe",width:'18rem',color:'black',marginBottom:'10px',boxShadow:"1px 2px 9px #ddcbcf"}}>
                    <Card.Body>
                        <Card.Title style = {{textAlign:'center',marginBottom:3,height:50}}>Order ID: {order.id}</Card.Title>
                        <Card.Text style = {{textAlign:'left'}}>Product: <b>{order.productName}</b></Card.Text>
                        <Card.Text style = {{textAlign:'left'}}>Address: <b>{order.address}</b></Card.Text>
                        <Card.Text style = {{textAlign:'left'}}>Payment method: <b>{order.payment}</b></Card.Text>
                        {order.payment !== "Cash" &&(
                            <Card.Text style = {{textAlign:'left'}}>Name on card: <b>{order.nameOnCard}</b></Card.Text>
                        )}
                        {order.payment === "Credit" &&(
                            <Card.Text style = {{textAlign:'left'}}>Credit number: <b>{order.creditNumber}</b></Card.Text>
                        )}
                        <Card.Text style = {{textAlign:'left'}}>Total price: <b>{order.totalPrice}$</b></Card.Text>
                        {roleAndId.role === "CLIENT" &&(
                            <Card.Text style = {{textAlign:'left'}}>Status: <b>{order.status}</b></Card.Text>
                        )}
                        {roleAndId.role === "SELLER" &&(
                            <Form onSubmit={updateOrder}>
                                <Row>
                                    <Form.Select value = {order.status} onChange = {(e) => setOrder({...order,status:e.target.value})}>
                                        <option value = "In process">In process</option>
                                        <option value = "On delivery">On delivery</option>
                                        <option value = "Delivered">Delivered</option>
                                    </Form.Select>
                                    <Button variant="primary" type="submit" style={{marginTop:15,marginBottom:-15}}>
                                        Update status
                                    </Button>
                                </Row>
                            </Form>
                        )}
                    </Card.Body>
                </Card>            
            </Row>
        </Container>
    )
}

export default Order;