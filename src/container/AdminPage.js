import { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Row, } from 'antd';
import { useLocation } from "react-router-dom";
import Header from '../component/Header';
import OrderCard from "../component/OrderCard";

const Home = (props) =>{
    const { BASE_URL } = props;
    
    const location = useLocation();
    const [fruits, setFruits] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    useEffect(()=>{
        fetchFruits();
        fetchOrders();
    }, [])

    const fetchFruits = () =>{
        axios
			.get(BASE_URL + "/api/fruits")
			.then((response) => {
                if(response.data){
                    setFruits(response.data);
                }
			})
			.catch(function () {
				alert("Error!");
			});
    }

    const fetchOrders = () =>{
        axios
			.get(BASE_URL + "/api/orders")
			.then((response) => {
                if(response.data){
                    setOrders(response.data);
                }
			})
			.catch(function () {
				alert("Error!");
			});
    }

    const getFruitByName = (name) =>{
        return fruits?.find(fruit=> fruit.name === name) || '';
    }

    return(
        <div style={{width: '100%', height: '100%', backgroundColor: '#fafafa'}}>
            
            <Header 
                user={location?.state?.user}
                setIsDrawerOpen={setIsDrawerOpen} 
                isDrawerOpen={isDrawerOpen}
                BASE_URL={BASE_URL}
            />
            {orders.length > 0 ? (
                <Row style={{height: 'calc(100vh - 94px)', padding: '32px', margin: 0, width: '100%'}} gutter={24}>
                    <Col span={24}>
                        {orders?.map(o=>{
                            return(
                                <OrderCard orderId={o._id} order={o.order} getFruitByName={getFruitByName} />
                            )
                        })}
                    </Col>
                </Row>
            ) : (
                <Row style={{height: 'calc(100vh - 94px)', padding: '32px', margin: 0, width: '100%'}} gutter={24}>
                    <Col span={24} style={{textAlign: 'center'}}>
                        No orders yet
                    </Col>
                </Row>
            )}
            
        </div>
    )
}

export default Home;