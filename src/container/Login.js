import React from 'react';
import { Col, Row, Input, Space, Button, Form } from 'antd';
import Login_pic from '../images/login_pic.jpg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ADMIN } from '../utils';

const Login = (props) =>{
    const { BASE_URL } = props;
    const navigate = useNavigate();

    const fontStyle={
        fontFamily: "Lato, sans-serif",
        color: "#333333",
        fontSize: "24px",
        fontWeight: 700,
    }

    const handleOnSubmit = ({username, password}) =>{
        axios
			.post(BASE_URL + "/api/login", {
				username: username,
				password: password,
                role: 'user'
			})
			.then((response) => {
                if(!response?.data?.success) {
                    alert("Error! " +  response.data?.message);
                    return;
                }
                if(response.data.user.role !== ADMIN){
                    navigate('/home', {state: {
                        user: response.data.user
                    }});
                }else{
                    navigate('/admin', {state: {
                        user: response.data.user
                    }});
                }
                
			})
			.catch(function () {
				alert("Error!");
			});
    }

    const onFinishFailed = () =>{

    }

    return(
        <>
            <Row>
                <Col span={24} style={{height: "200px", overflow: "hidden"}}>
                    <img src={Login_pic} alt={'login pic'} width="100%"  />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{textAlign: 'center', padding: '32px'}}>
                    <Form
                        name="loginForm"
                        onFinish={handleOnSubmit}
                        onFinishFailed={onFinishFailed}
                    >
                        <Space width={'300px'} direction='vertical' >
                            <Row >
                                <Col span={24} style={{...fontStyle, fontSize: '24px'}} >Welcome to Kaiwei's Fruit Store</Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{...fontStyle, fontSize: '16px'}} >Please login to enter the online store</Col>
                            </Row>
                            <Row style={{marginTop: "40px"}}>
                                <Col span={24} >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username' }]}
                                    >
                                        <Input placeholder='Username' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} >
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password' }]}
                                    >
                                        <Input.Password placeholder='Password' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "24px"}}>
                                <Col span={24} ><Button type="primary" block className={'submit'} htmlType="submit" >Next</Button></Col>
                            </Row>
                        </Space>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login;