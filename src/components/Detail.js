import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumContext } from '../context/ForumContext';
import Reply from './Reply';
import Headbar from './Headbar';
import { Card } from 'antd';
import axios from 'axios';

const Detail = () => {
    const [state, setState] = useContext(ForumContext);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const addComment = async() => {
        let response = await axios.post('https://xsong-forum-mysql-server.herokuapp.com/api/v1/thread/' + state.thread.id + '/replies', {
            rContent: inputValue,
            UserId: state.userId,
            ThreadId: state.thread.id
        },
        );
        console.log(response);
        setInputValue('')
        let response2 = await fetch('https://xsong-forum-mysql-server.herokuapp.com/api/v1/thread/' + state.thread.id + '/replies')
        let data2 = await response2.json();
        let replies = []
        for (let item of data2) {
            let reply = {
                        id: item.id,
                        content: item.rContent,
                        time: item.createdAt.slice(0,10),
                        author: item.User.userName
            };
            replies.push(reply);
        }
        
        setState(state=> ({...state, replies: replies})); 
    }
    let rList = state.replies;
    let repliesList = Object.values(rList).map(item=>{
        return<div key={item.id}>
            <Card className='thread-reply'>
            <div>{item.content}</div>
            <hr className='hr-dotted'/>
            <div className='display-end'>By --- {item.author} @ {item.time}</div>
            </Card>
        </div>
    })
    

    

    if (state.loggedin) {
       
        return (
            <div className='root'>
            <div className='main'>
            <Headbar />
            <Card title={state.thread.title} extra={state.thread.author + '    @' + state.thread.time} className='thread-main'>
                <p>{state.thread.content}</p>
               
            </Card>

                {repliesList}

                
            <Reply value={inputValue} onChange={handleChange} onSubmit={addComment}/>
            </div>
            </div>
            
        )
    }
    return (
        <div className='root'>
            <div className='main'>
            <Headbar />
            <Card title={state.thread.title} extra={state.thread.author + '    @' + state.thread.time} className='thread-main'>
                <p>{state.thread.content}</p>
            </Card>

                {repliesList}
            <div className='display-end'><Link to='/login'>-Log in-  </Link>to add comment </div>
            </div>
            </div>
    )  
}




export default Detail;