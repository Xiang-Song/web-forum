import React, { useState } from 'react';
import axios from 'axios';

const NewCategogy = () => {

    const [input, setInput] = useState({});

    const handleChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })
    


    const addNewCategory = async () => {
        let response = await axios.post('https://xsong-forum-mysql-server.herokuapp.com/api/v1/category/', {
            cName: input.category
        },
        );
        console.log(response);
    }

    return (<div>
        <input name='category' onChange={handleChange}/>
        <button onClick={addNewCategory}>add category</button>
    </div>)
}


export default NewCategogy;