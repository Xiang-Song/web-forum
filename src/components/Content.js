import React, { useState, useEffect, useContext } from 'react';
import { List, Layout, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { ForumContext } from '../context/ForumContext';

const { Footer, Sider, Content } = Layout;


const Content = (props) =>{

    const [state, setState] = useContext(ForumContext);
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState([]);

    const getCategories = async() => {
        let response = await fetch('https://xsong-forum-mysql-server.herokuapp.com/api/v1/category');
        let data = await response.json();
        let categoryList = []
        for (let item of data) {
            categoryList.push(item)
        }
        setCategories(categoryList)
    }

    const getThreads = async() => {
        let response = await fetch('https://xsong-forum-mysql-server.herokuapp.com/api/v1/thread');
        let data = await response.json();
        let threadList = []
        for (let item of data) {
            threadList.push(item)
        }
        setThreads(threadList);
    }

    const getThreadsById = async (id) => {
        let response = await fetch('https://xsong-forum-mysql-server.herokuapp.com/api/v1/category/'+id+'/threads')
        let data = await response.json();
        let threadList = []
        for (let item of data) {
            threadList.push(item)
        }
        setThreads(threadList);

    }
    

    useEffect(()=>{
        
            getCategories();
            getThreads();

    },[])

    
        
    const getAllThreads = () => {
        getThreads();
        setState(state=>({...state, category: '', cId: ''}))
    }
    
    const selectCategory = (id, name) => {
        getThreadsById(id);
        setState(state=> ({...state, category: name, cId: id}));
    }

    const getThreadInfo = async (id) => {
        let response = await fetch('https://xsong-forum-mysql-server.herokuapp.com/api/v1/thread/' + id)
        let data = await response.json();
        let thread = {
                    id: data[0].id, 
                    title:data[0].title,
                    content: data[0].tContent,
                    time: data[0].createdAt.slice(0,10),
                    author: data[0].User.userName
                }
        let response2 = await fetch('https://xsong-forum-mysql-server.herokuapp.com/api/v1/thread/' + id + '/replies')
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
        
        setState(state=> ({...state, thread: thread, replies: replies})); 
        
        
    }

    console.log(state.replies);

    let catelist = categories.map(item=>{
        return <div key={item.id}>
            <div onClick={()=>selectCategory(item.id, item.cName)}>
                <List.Item>{item.cName}</List.Item>  
            </div>
            
            </div>
    })

    // let threadArray = threads;
    // threadArray.sort(function(a,b){return b.id-a.id});
    let threadlist = threads.map(item=>{
    return <div key={item.id} className='thread-item'>
                <div onClick={()=>getThreadInfo(item.id)}>
                <Link to = {'thread/' + item.id}>
                <div>{item.title}</div> 
                <div>Author: {item.User.userName} @{item.createdAt.slice(0,10)}</div>
                </Link>
                </div>
                
                
            </div>
    })

    if (state.category && state.loggedin) {
        return (
            <div>
            
            <Row className='board-header'>
            <Col span={12}>
                Discuss Board
            </Col>
            <Col span={12} className='display-end'>
                <Button type='link' className='condition-button'>
                    <Link to = '/newthread'>Start a New Thread in category {state.category}</Link>
                </Button>
            </Col>
            </Row>
            <Layout>
                <Sider>
                    <div onClick={getAllThreads} className='display-center ant-list-item'>All</div>
                    {catelist}
                </Sider>
                <Content>
                    {threadlist}
                </Content>
            </Layout>
            <Footer>
                <hr className='hr-dotted' />
                <div> Copyright: Web Forum</div>
                <div> Contact us: himmelsong@gmail.com</div>
            </Footer>            
            </div>
        );
    }
    return (
        <div>
            <Row className='board-header'>
            <Col span={18}>
                Discuss Board
            </Col>
            </Row>
            
      <Layout>
        <Sider>
            <div onClick={getAllThreads} className='display-center ant-list-item'>All</div>
            {catelist}
        </Sider>
        <Content>
            {threadlist}
        </Content>
      </Layout>
      <Footer>
          <hr className='hr-dotted' />
          <div> Copyright: Web Forum</div>
          <div> Contact us: himmelsong@gmail.com</div>
      </Footer>
        
        </div>
    )
}






export default Content;