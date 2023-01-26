import React, {useEffect,useState,useContext} from "react";
import {useParams,Link} from 'react-router-dom';

import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from "../../context/Context.jsx";

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Product(){

    const {id} = useParams();
    const {roleAndId} = useContext(AuthContext);
    const [product,setProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [order,setOrder] = useState({
        productName:'',
        sellerId:'',
        address:'',
        payment:'',
        nameOnCard:'',
        expiration:'',
        cvv:'',
        creditNumber:'',
        totalPrice:''
    });
    const [showAlert,setShowAlert] = useState('')
    const [err,setErr] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    useEffect(() => {
        const getProduct = async () => {
            await AxiosInstance.get(`/product/${id}`,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then((results) => {
                setProduct(results.data[0]);
                setOrder({
                    productName:results.data[0].name,
                    sellerId:results.data[0].sellerId,
                    address:'',
                    payment:'',
                    nameOnCard:'',
                    expiration:'',
                    cvv:'',
                    creditNumber:'',
                    totalPrice:results.data[0].price
                })
            }).catch(err => {
                console.log(err);
            });
        }
        getProduct();
    },[])

    const deleteProduct = async (productId) => {
        try {
            await AxiosInstance.delete(`/delete-product/${productId}`,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
            window.location.href = "/products"
        } catch (err) {
            console.log(err)
        }
    }

    const createOrder = async () => {
        try{
            await AxiosInstance.post(`/create-order`,order,{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}}).then(async (response) => {
                console.log(response)
            }).catch(err => {
                setErr(err.response.data.msg);
                setShowAlert(true)
            });
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete {product.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action can not be reverted.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={async () => {
                        await deleteProduct(id);
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement = {"end"}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Order now</Offcanvas.Title>
                </Offcanvas.Header>
                <Alert variant='danger' show = {showAlert} style = {{marginTop:10,padding:10}}>
                    {err}
                </Alert>
                <Offcanvas.Body>
                <Form onSubmit={createOrder}>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter delivery address" value = {order.address} onChange = {(e) => setOrder({...order,address:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPayment">
                        <Form.Label>Payment method</Form.Label>
                        <div className="mb-3">
                            <Form.Check
                                inline
                                label="Cash"
                                name="Cash"
                                value={"Cash"}
                                checked = {order.payment === "Cash"}
                                onChange = {(e) => setOrder({...order,payment:e.target.value})}
                                type={"radio"}
                                id={"Cash"}
                            />
                            <Form.Check
                                inline
                                label="Credit"
                                name="Credit"
                                value={"Credit"}
                                checked = {order.payment === "Credit"}
                                onChange = {(e) => setOrder({...order,payment:e.target.value})}
                                type={"radio"}
                                id={"Credit"}
                            />
                            <Form.Check
                                inline
                                label="Debit"
                                name = "Debit"
                                value={"Debit"}
                                checked = {order.payment === "Debit"}
                                onChange = {(e) => setOrder({...order,payment:e.target.value})}
                                type={"radio"}
                                id={"Debit"}
                            />
                        </div>
                    </Form.Group>
                    {order.payment === "Cash" &&(
                        <div></div>
                    )}
                    {order.payment === "Credit" &&(
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicNameOnCard">
                                <Form.Label>Name on card</Form.Label>
                                <Form.Control type="text" placeholder="Enter name on card" value = {order.nameOnCard} onChange = {(e) => setOrder({...order,nameOnCard:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicExpirationDate">
                                <Form.Label>Expiration date</Form.Label>
                                <Form.Control type="month" min="2000-01" placeholder="Enter expiration date" value = {order.expiration} onChange = {(e) => setOrder({...order,expiration:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="number" placeholder="Enter CVV" value = {order.cvv} onChange = {(e) => setOrder({...order,cvv:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCreditNumber">
                                <Form.Label>Credit number</Form.Label>
                                <Form.Control type="number" placeholder="Enter credit number" value = {order.creditNumber} onChange = {(e) => setOrder({...order,creditNumber:e.target.value})}/>
                            </Form.Group>
                        </div>
                    )}
                    {order.payment === "Debit" &&(
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicNameOnCard">
                                <Form.Label>Name on card</Form.Label>
                                <Form.Control type="text" placeholder="Enter name on card" value = {order.nameOnCard} onChange = {(e) => setOrder({...order,nameOnCard:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicExpirationDate">
                                <Form.Label>Expiration date</Form.Label>
                                <Form.Control type="month" min="2000-01" placeholder="Enter expiration date" value = {order.expiration} onChange = {(e) => setOrder({...order,expiration:e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="number" placeholder="Enter CVV" value = {order.cvv} onChange = {(e) => setOrder({...order,cvv:e.target.value})}/>
                            </Form.Group>
                        </div>
                    )}
                    <Button variant="primary" type="submit">
                        Order
                    </Button>
                </Form>
                </Offcanvas.Body>
            </Offcanvas>
            <Container style={{paddingInline:4}}>
                <Row style = {{alignItems:"center"}}>
                    <Col md = {1}>
                        <div style = {{marginBottom:3,marginLeft:-75,marginRight:-80}}>
                            <img style={{borderWidth:"8px",borderColor:"black"}} src = {product.image} width = {600} height = {690}></img>
                        </div>
                    </Col>
                    <Col md = {8}></Col>
                    <Col md = {3}>
                        <div>
                            <div style={{marginBottom:1,fontSize:"15px",textAlign:"left",width:250}}>Product ID: {product.id}</div>
                            <h1 style={{color:"black",textAlign:"left",width:250}}>{product.name}</h1>
                            <p style={{fontWeight:'bolder',color:"#5d5d5d",fontSize:'16px',textAlign:"left",width:250}}>{product.description}</p>
                            <p style = {{marginBottom:20,textAlign:"left"}}>Price: {product.price}$</p>
                            <div style={{display: 'inline-block'}}>
                                {roleAndId.id === product.sellerId &&(
                                    <div>
                                        <Link to = {`/update-product/${id}`}><Button variant="warning" style={{marginRight:'6px'}}>Update</Button></Link>
                                        <Button variant = "danger" onClick={handleShowModal}>Delete</Button>
                                    </div>
                                )}
                                {roleAndId.id !== product.sellerId &&(
                                    <div>
                                        <Button variant="success" onClick={handleShowOffcanvas}>Buy now</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Product;