import React, {useState,useContext} from 'react';
import jwt_decode from 'jwt-decode';
import AxiosInstance from '../../util/Axios.jsx';
import AuthContext from '../../context/Context.jsx';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function SellerRegister() {
    const {getLoggedIn} = useContext(AuthContext);
    const [page,setPage] = useState(0);
    const [user,setUser] = useState({
        email:'',
        password:'',
        name:'',
        bankName:'',
        bankAccountNumber:'',
        bankAddress:''
    });
    const [err,setErr] = useState('');
    const [showAlert,setShowAlert] = useState(false)

    const registerSubmit = async e => {
        e.preventDefault()
        try{
            await AxiosInstance.post('/seller/signup',user,{withCredentials:true}).then(async (response) => {
                sessionStorage.setItem('access-token',response.data.token);
            }).catch(err => {
                setErr(err.response.data.msg);
                setShowAlert(true)
            });
            const token = jwt_decode(sessionStorage.getItem('access-token'));
            if(token.role === "CLIENT"){
                await getLoggedIn();
                window.location.href = "/products"
            }else if(token.role === "SELLER"){
                await getLoggedIn();
                window.location.href = "/products"
            }else if(token.role === "MASTER"){
                await getLoggedIn();
                window.location.href = "/products"
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <Container style={{marginTop:5,marginBottom:5,display:"flex",justifyContent:"center"}}>
            <Card style={{paddingBlock:4,paddingInline:1,borderRadius:12,border:"none",width:400}}>
                <Card.Body>
                    <Card.Title style = {{marginBottom:3,fontSize:28}}>Register</Card.Title>
                    <h6 style={{marginTop:4,fontSize:16,fontStyle:"italic",fontWeight:"lighter"}}>*You are registering as a seller</h6>
                    <Alert variant='danger' show = {showAlert} style = {{marginTop:10,padding:10}}>
                        {err}
                    </Alert>
                    <Form onSubmit={registerSubmit}>
                        {page === 0 &&(
                            <div>
                                <h6>Account information</h6>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='name'>
                                            <Form.Label style={{marginTop:5}}>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name" value={user.name} onChange = {(e) => setUser({...user,name:e.target.value})}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='email'>
                                            <Form.Label style={{marginTop:5}}>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" value = {user.email} onChange = {(e) => setUser({...user,email:e.target.value})}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='password'>
                                            <Form.Label style={{marginTop:5}}>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter password" value={user.password} onChange = {(e) => setUser({...user,password:e.target.value})}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{display:"flex",textAlign:"center",flexDirection:"column",paddingInline:5,marginTop:5,marginBottom:3}}>
                                    <Button variant="secondary" style = {{height:40,borderRadius:10,marginTop:15}} type = "button" onClick = {() => setPage(1)}>
                                        Next
                                    </Button>
                                </div>                                
                            </div>
                        )}
                        {page === 1 &&(
                            <div>
                                <h6>Account information</h6>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='bankName'>
                                            <Form.Label style={{marginTop:5}}>Bank name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter bank name" value={user.bankName} onChange = {(e) => setUser({...user,bankName:e.target.value})}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='bankAccountNumber'>
                                            <Form.Label style={{marginTop:5}}>Bank account number</Form.Label>
                                            <Form.Control type="number" placeholder="Enter bank account number" value = {user.bankAccountNumber} onChange = {(e) => setUser({...user,bankAccountNumber:e.target.value})}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='bankAddress'>
                                            <Form.Label style={{marginTop:5}}>Bank address</Form.Label>
                                            <Form.Control type="text" placeholder="Enter bank address" value={user.bankAddress} onChange = {(e) => setUser({...user,bankAddress:e.target.value})}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{display:"inline",flexDirection:"column",paddingInline:5,marginTop:5,marginBottom:3}}>
                                    <Button variant="secondary" style = {{marginInlineEnd:5,height:40,width:150,borderRadius:10,marginTop:15}} type="button" onClick={() => setPage(0)}>
                                        Previous
                                    </Button>
                                    <Button variant="primary" style = {{height:40,width:150,borderRadius:10,marginTop:15}} type="submit">
                                        Register
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SellerRegister;