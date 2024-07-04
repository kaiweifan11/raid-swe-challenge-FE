import { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Row, Button, Drawer, Space } from 'antd';
import { useLocation } from "react-router-dom";
import FruitCard from '../component/FruitCard';
import DrawerItem from '../component/DrawerItem';
import ConfirmModal from '../component/ConfirmModal';
import Header from '../component/Header';
import { formatPrice, priceStyle, getFruitImage } from '../utils';

const getDefaultCart = () => {
    return JSON.parse(window.localStorage.getItem('cart')) || {};
}

const Home = (props) =>{
    const { BASE_URL } = props;
    
    const location = useLocation();
    const [fruits, setFruits] = useState([]);
    const [cart, setCart] = useState(getDefaultCart() || {});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmSendOrderOpen, setIsConfirmSendOrderOpen] = useState(false);
    
    useEffect(()=>{
        fetchFruits();
    }, [])

    useEffect(()=>{
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

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

    const addToCart = (fruitName) =>{
        const newCart = {...cart}
        if(!newCart[fruitName]) newCart[fruitName] = 1;
        else newCart[fruitName] = newCart[fruitName] +1;
        setCart(newCart);
    }

    const remove1FromCart = (fruitName) =>{
        const newCart = {...cart}
        if(newCart[fruitName] > 1) newCart[fruitName] = newCart[fruitName] -1;
        else if(newCart[fruitName] === 1) delete newCart[fruitName];
        else return;
        setCart(newCart);
    }

    const onDrawerClose = (props) =>{
        setIsDrawerOpen(false);
    }

    const getFruitByName = (name) =>{
        return fruits?.find(fruit=> fruit.name === name) || '';
    }

    const getTotalPrice = () =>{
        return Object.keys(cart).reduce((total, fruitName)=>{
            const qty = cart[fruitName];
            const fruit = getFruitByName(fruitName);
            return total += qty * fruit.price;
        }, 0)
    }

    const handleSendOrder = () =>{
        setIsConfirmSendOrderOpen(true);
    }

    const handleConfirmSendOrder = () =>{
        sendOrder();
        onDrawerClose();
    }

    const sendOrder = ()=>{
        axios
			.post(BASE_URL + "/api/order", {
                userId: location.state.user._id,
                order: cart
            })
			.then((response) => {
                if(response.data.success){
                    fetchFruits();
                    setCart({})
                    window.localStorage.setItem('cart', JSON.stringify({}))
                    alert('Order successfully sent');
                }
			})
			.catch(function () {
				alert("Error!");
			});
    }

    return(
        <div style={{width: '100%', height: '100%', backgroundColor: '#fafafa'}}>
            
            <Drawer title="Shopping Cart" onClose={onDrawerClose} open={isDrawerOpen}>
                <ConfirmModal 
                    isModalOpen={isConfirmSendOrderOpen} 
                    setIsModalOpen={setIsConfirmSendOrderOpen} 
                    onConfirm={handleConfirmSendOrder}
                    title={"Confirm Order"}
                    contentText={"Confirm send order?"}
                />
                {Object.keys(cart).map(fruitName=>{
                    const qty = cart[fruitName];
                    const fruit = getFruitByName(fruitName);
                    const image = getFruitImage(fruitName);
                    return(
                        <DrawerItem qty={qty} fruit={fruit} image={image} />
                    )
                })}
                <Space style={{...priceStyle, fontSize: '24px', marginTop: '24px', width: '100%', textAlign: 'right'}}>
                    Total Price: 
                    {formatPrice(getTotalPrice())}
                </Space>
                {Object.keys(cart).length > 0 && (
                    <Button 
                        type="primary" 
                        block 
                        className={'submit'} 
                        htmlType="submit" 
                        style={{marginTop: '24px'}} 
                        onClick={handleSendOrder}
                    >
                        Order now
                    </Button>
                )}
            </Drawer>
            <Header 
                user={location?.state?.user}
                setIsDrawerOpen={setIsDrawerOpen} 
                isDrawerOpen={isDrawerOpen}
                BASE_URL={BASE_URL}
            />
            <Row style={{height: 'calc(100vh - 94px)', padding: '32px', margin: 0, width: '100%'}} gutter={24}>
                {fruits.map(fruit=>{
                    return(
                        <Col span={6} style={{textAlign: 'right'}}>
                            <FruitCard 
                                fruitName={fruit.name}
                                price={fruit.price}
                                image={getFruitImage(fruit.name)}
                                qty={fruit.quantity}
                                addToCart={addToCart}
                                remove1FromCart={remove1FromCart}
                                cart={cart}
                            />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Home;