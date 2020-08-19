import React from 'react';
import Headbar from './Headbar';
import Board from './Board';
import { Row, Col} from 'antd';

const Home = () => {
    return (
        <div className='root'>
            <div className='main'>
            <Row>
                <Col span={24}>
                    <Headbar />
                </Col>
            </Row>
            <Board/>
            </div>
        </div>
            
        
    )
}





export default Home;