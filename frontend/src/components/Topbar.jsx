import React,{useContext} from "react";

import AuthContext from "../context/Context.jsx";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

function Topbar(){

    const {roleAndId} = useContext(AuthContext);

    const logout = () => {
        sessionStorage.removeItem('access-token');
        window.location.href = "/"
    }

    return(
        <Navbar bg="light" variant="light" style = {{marginInline:0,position:"absolute",insetInline:0,top:0,width:"100%"}}>
            <Container>
                <Navbar.Brand>App</Navbar.Brand>
                {roleAndId.role === "SELLER" &&(
                    <Nav className="me-auto">
                        <Nav.Link href={`/products/${roleAndId.id}`}>Products</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                        <Nav.Link href="/create-product">Create product</Nav.Link>
                    </Nav>
                )}
                {roleAndId.role === "CLIENT" &&(
                    <Nav className="me-auto">
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                    </Nav>
                )}
                <Navbar.Collapse style={{justifyContent:"end"}}>
                    <Navbar.Text style={{marginRight:10}}>
                        Signed in as: {roleAndId.role}
                    </Navbar.Text>
                    <Button variant="outline-danger" onClick = {logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Topbar;