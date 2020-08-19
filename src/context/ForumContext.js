import React, { useState } from 'react';


const ForumContext = React.createContext([{}, () => {}]);

const ForumProvider = (props) => {
    const [state, setState] = useState({
        loggedin: false,
        username: '',
        userId: '',
        thread: '',
        replies: '',
        category: '',
        cId: ''
        
    });
    return (
      <ForumContext.Provider value={[state, setState]}>
        {props.children}
      </ForumContext.Provider>
    );
  }
  
  export { ForumContext, ForumProvider };