import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { ForumContext } from '../context/ForumContext';
import logo from '../image/forum-logo.png';



const Headbar = () => {
    const [state, setState] = useContext(ForumContext);
    useEffect(()=> {
                let mounted = true;
                const token = localStorage.getItem('JWT');
                const fetchUser =  async () =>{
                const response = await fetch('https://xsong-forum-mysql-server.herokuapp.com/profile', {
                    method: 'POST',
                    headers: {Authorization: "JWT " + token},
                    },);
        
                
                if (response.status !== 200) {
                    if (mounted) {
                        setState(state=> ({...state, loggedin: false, username: '', userId:''})); 
                    }
                    
                } else {
                    const data = await response.json();
                    if (mounted) {
                        setState(state=> ({...state, loggedin: true, username: data.username, userId: data.userId}));
                    }
                    
                }
                return ()=> {mounted = false};
                }
                
                fetchUser(); 
                
                }, [setState])

    const logout = () => {
            localStorage.removeItem('JWT');
            setState(state=> ({...state, loggedin: false, username: '', userId:''})); 
        }

    if (state.loggedin) {
        return (
            <div>
                <Row className="headbar">
                    <Col span={10} className='logo-container'><Link to='/home'><img src={logo} alt='logo' className='logo'/></Link></Col>
                    <Col span={3}></Col>
                    <Col span={5} className='headerbar-item display-end'>
                        Welcome {state.username}
                    </Col>
                    <Col span={6} className='headerbar-item display-end'>
                        <Button type="primary" onClick={logout}><Link to = '/login'>Log out</Link></Button>
                    </Col>
                    
                </Row>
                
                
            </div>
            )
    } else {
        return (
            <div>
                <Row className="headbar">
                    <Col span={10} className='logo-container'><Link to='/home'><img src={logo} alt='logo' className='logo' /></Link></Col>
                    <Col span={3}></Col>
                    <Col span={5} className='headerbar-item display-end'>
                        <Button type="primary"><Link to = '/login'>Log in</Link></Button>
                    </Col>
                    <Col span={6} className='headerbar-item display-end'>
                        <Button type="primary" className='signup'><Link to = '/register'>Sign up</Link></Button>
                    </Col>
                </Row>
                
            </div>
            )
    }
}


export default Headbar; 