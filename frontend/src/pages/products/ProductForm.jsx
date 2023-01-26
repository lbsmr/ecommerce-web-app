import React, {useState,useContext,useEffect} from "react";
import {useParams} from "react-router-dom";

import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from "../../context/Context.jsx";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function ProductForm(){

    const {id} = useParams();
    const {roleAndId} = useContext(AuthContext);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [err,setErr] = useState('');
    const [showAlert,setShowAlert] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            if(id){
                await AxiosInstance.get(`/product/${id}`,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
                    setProduct({
                        name:results.data[0].name,
                        description:results.data[0].description,
                        price: results.data[0].price,
                        image:results.data[0].image
                    })
                }).catch(err => {
                    console.log(err.response.data.msg);
                });
            }

        }
        getProduct();
    },[])

    const createProduct = async () => {
        try {
            await AxiosInstance.post('/create-product',product,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then(async (response) => {
                if(response.data.msg === "Product created."){
                    window.location.href = `/products/${roleAndId.id}`
                }
            }).catch(err => {
                setErr(err.response.data.msg);
                setShowAlert(true)
            });
        } catch (err) {
            console.log(err)
        }
    }

    const updateProduct = async () => {
        try {
            await AxiosInstance.patch(`/update-product/${id}`,{...product},{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
            window.location.href = "/products"
        } catch (err) {
            console.log(err)
        }
    } 
    
    return(
        <Container style={{marginTop:5,marginBottom:5,display:"flex",justifyContent:"center"}}>
            <Card style={{paddingBlock:4,paddingInline:1,borderRadius:12,border:"none",width:400}}>
                <Card.Body>
                    <Card.Title style = {{marginBottom:3,fontSize:28}}>{id ? "Update product" : "Create product"}</Card.Title>
                    <Alert variant='danger' show = {showAlert} style = {{marginTop:10,padding:10}}>
                        {err}
                    </Alert>
                    <Form onSubmit={async () => {
                        if(id){
                            await updateProduct();
                        } else {
                            await createProduct();
                        }
                    }}>
                        <Row>
                            <Col>
                                <Form.Group controlId='name'>
                                    <Form.Label style={{marginTop:5}}>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value = {product.name} onChange = {(e) => setProduct({...product,name:e.target.value})}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId='description'>
                                    <Form.Label style={{marginTop:5}}>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter description" value={product.description} onChange = {(e) => setProduct({...product,description:e.target.value})}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId='price'>
                                    <Form.Label style={{marginTop:5}}>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter price" value={product.price} onChange = {(e) => setProduct({...product,price:e.target.value})}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId='image'>
                                    <Form.Label style={{marginTop:5}}>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Enter image URL" value={product.image} onChange = {(e) => setProduct({...product,image:e.target.value})}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div style={{display:"flex",textAlign:"center",flexDirection:"column",paddingInline:5,marginTop:5,marginBottom:3}}>
                            <Button variant={id ? "warning" : "primary"} style = {{height:40,borderRadius:10,marginTop:15}} type="submit">
                                {id ? "Update" : "Create"}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProductForm;