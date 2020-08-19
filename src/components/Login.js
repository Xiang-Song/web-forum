import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Layout
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import logo from '../image/forum-logo.png';

const { Footer } = Layout;

const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 10,
        offset: 8,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 8,
      },
    },
  };

const Login = () => {
  
    const [form] = Form.useForm();
    const [loginput, setLoginput] = useState({})
    const handleInputChange = (e) => setLoginput({
        ...loginput,
        [e.currentTarget.name]: e.currentTarget.value
    })

    const [loggedin, setLoggedin] = useState(false);
    const [error, setError] = useState('')

    const loginUser = async (e) => {
        const {username, password} = loginput;
        try {
            const response = await axios.post('https://xsong-forum-mysql-server.herokuapp.com/login', {
                username,
                password,
            },
            );
            localStorage.setItem('JWT', response.data.token);
            setLoggedin(true);
            setError('');
            form.resetFields();
        } catch(error){
            console.error(error.response.data);
            if (error.response.data==='username not exist' || error.response.data==='passwords do not match') {
                setError(error.response.data);
                setLoggedin(false);
            }
        }
    }


    if (!loggedin) {
        return (
            <div className='root'>
                <div className='main'> 
                <Link to='/home'><img src={logo} alt='logo' className= 'logo-big'/></Link>
                <Form
                {...formItemLayout}
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{
                remember: true,
                }}
                onFinish={loginUser}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Username" 
                    name='username'
                    onChange={handleInputChange} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password" 
                    name='password'
                    onChange={handleInputChange}
                    />
                </Form.Item>
                
                {error && <p className='error-info'>{error}</p>}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    
                    Or <Link to='/register'>register now!</Link>
                </Form.Item>
                </Form>
                <Footer>
                    <hr className='hr-dotted' />
                    <div> Copyright: Web Forum</div>
                    <div> Contact us: himmelsong@gmail.com</div>
                </Footer>
            </div>
            </div>
          );
        };
        return (<Redirect  to='/home'/>) 
    }
  

export default Login;