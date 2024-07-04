import { useState } from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Col, Row, Divider, Button, Space } from 'antd';
import Logo from '../../images/Logo.png';
import axios from 'axios';
import ConfirmModal from '../ConfirmModal';
import { logout, ADMIN } from '../../utils';
import { useNavigate } from "react-router-dom";

const Header = (props) =>{
    const {
        user,
        setIsDrawerOpen=()=>{}, 
        isDrawerOpen=false,
        BASE_URL,

    } = props;

    const navigate = useNavigate();
    const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

    const handleLogout = () =>{
        setIsConfirmLogoutOpen(true);
    }

    return(
        <Row style={{height: "80px"}}>
            <ConfirmModal 
                isModalOpen={isConfirmLogoutOpen} 
                setIsModalOpen={setIsConfirmLogoutOpen} 
                onConfirm={()=>logout(axios, BASE_URL, navigate)}
                title={"Logout"}
                contentText={"Confirm logout?"}
            />
            <Col span={8} >
            <Space ><img src={Logo} alt={'logo'} height={'80px'}/></Space></Col>
            <Col span={16} style={{textAlign: 'right', padding: '24px'}}>
                <Space>
                    {user.role !== ADMIN && (
                        <Button
                            type="text"
                            icon={<ShoppingCartOutlined style={{ fontSize : "32px"}}/>}
                            onClick={() => {setIsDrawerOpen(!isDrawerOpen)}}
                        >
                            Cart
                        </Button>
                    )}
                    <Button type="primary" style={{display: 'inline-block'}} onClick={handleLogout}>Logout</Button>
                </Space>
            </Col>
            <Divider style={{margin: 0}}/>
        </Row>
    )
}

export default Header;