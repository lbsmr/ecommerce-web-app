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

function Login() {
    const {getLoggedIn} = useContext(AuthContext);
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const [err,setErr] = useState('');
    const [showAlert,setShowAlert] = useState(false)


    const loginSubmit = async e => {
        e.preventDefault()
        try{
            await AxiosInstance.post('/login',user,{withCredentials:true}).then(async (response) => {
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
                window.location.href = `/create-product`
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
                    <Card.Title style = {{marginBottom:3,fontSize:28}}>Login</Card.Title>
                    <Alert variant='danger' show = {showAlert} style = {{marginTop:10,padding:10}}>
                        {err}
                    </Alert>
                    <Form onSubmit={loginSubmit}>
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
                            <Button variant="primary" style = {{height:40,borderRadius:10,marginTop:15}} type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;