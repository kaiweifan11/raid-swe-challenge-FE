import { Card, Space, Typography, Button, Row, Col } from 'antd';
import { formatPrice, priceStyle } from '../../utils';
const { Text, Title } = Typography;

const FruitCard = (props) =>{
    const { fruitName, image, price=0, qty=0, addToCart, remove1FromCart, cart } = props;
    
    const formattedPrice = formatPrice(price);
    const textStyle = {
        fontFamily: "Lato, sans-serif",
        fontSize: "14px",
        fontWeight: 400,
    }
    
    return(
        <Card title={<Title level={4}>{fruitName}</Title>} bordered={false} style={{ width: "100%", textAlign: 'left'}}>
            <Row>
                <Col span={24} style={{textAlign: 'center'}} >
                    <Space style={{width: '50%', height: '150px'}}><img src={image} alt={fruitName} width={'100%'} /></Space>
                </Col>
            </Row>
            <Row>
                <Col span={24} >
                    <Space direction="vertical" >
                        <Text style={priceStyle}>{`$ ${formattedPrice}`}</Text>
                        {`Remaining Stock: ${qty}`}
                    </Space>
                </Col>
            </Row>
            <Row>
                {cart[fruitName] > 0 &&(
                    <Col span={6} style={{marginTop: '24px', textAlign: 'left'}}>
                        <Text style={textStyle}>{`In Cart ${cart[fruitName]}`}</Text>
                    </Col>
                )}
                <Col span={cart[fruitName] ? 18: 24} style={{marginTop: '24px', textAlign: 'right'}}>
                    <Button type="primary" style={{display: 'inline-block'}} onClick={()=>addToCart(fruitName)}>Add to Cart</Button>
                    {cart[fruitName] > 0 &&(
                        <Button type="primary" style={{marginLeft: '8px'}} danger onClick={()=>remove1FromCart(fruitName)}>Remove 1</Button>
                    )}
                </Col>
            </Row>
        </Card>
    )
    
}

export default FruitCard;