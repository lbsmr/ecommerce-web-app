import React,{useState} from "react";
import {Link} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function Home(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose how to register</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Link to = "/register/user"><Button variant = "info" style = {{height:40,borderRadius:10,marginTop:15,borderColor:"azure"}} type = "button">As client</Button></Link>
                    <Link to = "/register/seller"><Button variant = "info" style = {{height:40,borderRadius:10,marginTop:15,borderColor:"azure"}} type = "button">As seller</Button></Link>
                </Modal.Footer>
            </Modal>
            <Container style={{marginTop:5,marginBottom:5,display:"flex",justifyContent:"center"}}>
                <Row>
                    <h1 style={{display:"block"}}>Welcome!</h1>
                    <Col>
                        <Link to = "/login"><Button variant = "info" style = {{height:40,borderRadius:10,marginTop:15,borderColor:"azure"}} type = "button">Login</Button></Link>
                    </Col>
                    <Col>
                        <Button onClick={handleShow} variant = "info" style = {{height:40,borderRadius:10,marginTop:15,borderColor:"azure"}}>Register</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;