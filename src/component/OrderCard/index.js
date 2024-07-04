

import { Card, Space, Typography, Row, Col } from 'antd';
import { formatPrice, getFruitImage } from '../../utils';
const { Text } = Typography;

const OrderCard = (props) =>{
    const { orderId, order, getFruitByName } = props;

    const orderIdStyle = {
        fontFamily: "Lato, sans-serif",
        fontSize: "24px",
        fontWeight: 700,
    }

    const getTotalPrice = () =>{
        return Object.keys(order).reduce((total, fruitName)=>{
            const qty = order[fruitName];
            const fruit = getFruitByName(fruitName);
            return total += qty * fruit.price;
        }, 0)
    }
    
    return(
        <Card style={{ width: "100%", textAlign: 'left', marginBottom: '24px'}}>
            <Row>
                <Col span={24} style={{textAlign: 'left'}} >
                    <Text style={orderIdStyle}>{`Order ID: ${orderId}`}</Text>
                </Col>
            </Row>
            {Object.keys(order).map(fruitName => (
                <Row>
                    <Col span={1} style={{textAlign: 'center'}} >
                        <Space style={{width: '50%'}}><img src={getFruitImage(fruitName)} alt={fruitName} width={'100%'} /></Space>
                    </Col>
                    <Col span={6} style={{textAlign: 'center'}} >
                        <Text>{fruitName}</Text>
                    </Col>
                    <Col span={6} style={{textAlign: 'center'}} >
                        <Text>{`Qty: ${order[fruitName]}`}</Text>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col span={24} style={{textAlign: 'right'}} >
                    <Text style={orderIdStyle}>{`Grand Total: ${formatPrice(getTotalPrice())}`}</Text>
                </Col>
            </Row>
        </Card>
    )
    
}

export default OrderCard;