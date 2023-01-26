import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';

import AxiosInstance from '../../util/Axios.jsx';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductList(){

    const [products,setProducts] = useState([]);
    const {sellerId} = useParams()
    
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await AxiosInstance.get('/products',{withCredentials:true,headers:{'access-token':sessionStorage.getItem('access-token')}});
                const p = res.data
                console.log(p)
                if(sellerId){
                    const sellerProducts = p.filter(product => product.sellerId == sellerId);
                    console.log(sellerProducts)
                    setProducts(sellerProducts)
                } else {
                    setProducts(p)
                }
            } catch (err) {
                alert(err)
            }
        }
        getProducts();
    },[])

    return(
        <Container style = {{textAlign:"center",paddingBlock:5,marginTop:50}}>
            <Row>
                {products.length === 0 &&(
                    <Row>
                        <p>No products found.</p>
                    </Row>
                )}
                {products.map((product) => {
                        return <Col key={product.id} md = {products.length == 2 ? 6 : 4}>
                        <Link to = {`/product/${product.id}`}>
                            <Card style={{backgroundColor:"#fffefe",width:'18rem',height:'26rem',color:'black',marginBottom:'10px',boxShadow:"1px 2px 9px #ddcbcf"}}>
                                <Card.Img variant="top" src={product.image} width = {286} height = {180}/>
                                <Card.Body>
                                    <Card.Title style = {{textAlign:'center',marginBottom:3,height:50}}>{product.name}</Card.Title>
                                    <Card.Text style = {{textAlign:'center',fontWeight:'normal',height:60,color:"#5d5d5d"}}>{product.description}</Card.Text>
                                    <Card.Text style = {{textAlign:'center',fontWeight:'bolder',marginBottom:2}}>{product.price}$</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>                    
                })}
            </Row>
        </Container>
    )
}

export default ProductList;