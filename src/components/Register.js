import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Layout
} from 'antd';
import axios from 'axios';
import logo from '../image/forum-logo.png';

const { Footer } = Layout;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
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


// start the component 
const Register = () => {
  const [form] = Form.useForm();

  const [input, setInput] = useState({})
  const handleInputChange = (e) => setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
  })

  const [serverMessage, setServerMessage] = useState('')
  const [error, setError] = useState(false)

  const registerUser = async(e) => {
      
    const {username, firstname, lastname, email, password} = input;
    
      try {
        const response = await axios.post('https://xsong-forum-mysql-server.herokuapp.com/register', {
            username,
            firstname,
            lastname,
            email,
            password
        }, 
        );
        setServerMessage(response.data.message);
        setError(false);
        setInput({});
        form.resetFields();
    } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'username or email already taken'){
            setError(true);
            setServerMessage('');
        }
    }
    
      return false;
      
   
      
        
    }
    if (serverMessage !== 'user created') {
      return (
        <div className='root'>
          <div className='main'>
          <Link to='/home'><img src={logo} alt='logo' className= 'logo-big'/></Link>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={registerUser}
            scrollToFirstError
          >
      
          <Form.Item
              name="username"
              label="Username"
              rules={[
              {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
              },
              ]}
          >
              <Input name="username" onChange={handleInputChange}/>
          </Form.Item>
      
          <Form.Item
              name="firstname"
              label="First Name"
              rules={[
              {
                  required: true,
                  message: 'Please input your first name!',
                  whitespace: true,
              },
              ]}
          >
              <Input name="firstname" onChange={handleInputChange}/>
          </Form.Item>
      
          <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
              {
                  required: true,
                  message: 'Please input your last name!',
                  whitespace: true,
              },
              ]}
          >
              <Input name="lastname" onChange={handleInputChange}/>
          </Form.Item>
          
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input name="email" onChange={handleInputChange}/>
            </Form.Item>
      
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password name="password" onChange={handleInputChange}/>
            </Form.Item>
      
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
      
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
      
            
            {(error ===true) && <div><p className = 'error-info'>That username or email is already taken.</p></div>}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className='signup'>
                Sign up
              </Button>
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
    } else {
      return (
        <Redirect  to='/login'/>
      )
    }
  
    

  
};

export default Register;