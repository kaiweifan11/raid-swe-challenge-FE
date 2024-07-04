import { Card, Row, Col, Space } from 'antd';
import { formatPrice, priceStyle } from '../../utils';

const DrawerItem = (props) =>{
    const { qty, fruit, image } = props;

    const formattedPrice = formatPrice(fruit.price) ;

    return(
        <Card  style={{ width: "100%", textAlign: 'left', marginTop: "8px"}}>
            <Row>
                <Col span={6}>
                    <Space style={{width: '50%'}}><img src={image} alt={fruit.name} width={'100%'} /></Space>
                </Col>
                <Col span={12}>
                    <Space direction='vertical'>
                        {fruit.name}
                        {`quantity: ${qty}`}
                    </Space>
                </Col>
                <Col span={6}>
                    <Space style={{...priceStyle,}}>
                        {`$ ${formattedPrice}`}
                    </Space>
                </Col>
            </Row>
        </Card>
    )
}

export default DrawerItem;