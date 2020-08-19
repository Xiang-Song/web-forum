import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import Headbar from './Headbar';
import { ForumContext } from '../context/ForumContext';
import axios from 'axios';

const { TextArea } = Input;

const NewThread = () => {
    const [state] = useContext(ForumContext);

    const [submited, setSubmited] = useState(false)

    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    const postNewThread = async () => {
        let response = await axios.post('https://xsong-forum-mysql-server.herokuapp.com/api/v1/category/' + state.cId + '/threads', {
            title: input.title,
            tContent: input.tContent,
            UserId: state.userId,
            CategoryId: state.cId
        },
        );
        console.log(response);
        setSubmited(true);
    }


    if (!submited) {
        return (
            <div className='root'>
            <div className='main'>
            <Headbar />
            <Form.Item>
            <label>Title:</label>
            <TextArea rows={1}  placeholder='title' name='title' onChange={handleInputChange}/>
            </Form.Item>      
            <Form.Item>
            <label>Content:</label>
            <TextArea rows={7}  placeholder='content' name='tContent' onChange={handleInputChange}/>
            </Form.Item>
            <Form.Item>
            <Button htmlType="submit"  type="primary" onClick={postNewThread}>
                Start New Thread in category {state.category}
            </Button>
            </Form.Item>
            </div>   
            </div>
        )
    } 
    return (<Redirect  to='/home'/>)  
}

export default NewThread;