import React from 'react';
import {  Form, Button, Input } from 'antd';
const { TextArea } = Input;


const Reply = (props) => {

    
    return (
        <div className='reply'>
    <Form.Item>
      <TextArea rows={7} onChange={props.onChange} value={props.value} placeholder='Add your comment'/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"  type="primary" onClick={props.onSubmit}>
        Add Comment
      </Button>
    </Form.Item>
  </div>
    )

}


export default Reply;