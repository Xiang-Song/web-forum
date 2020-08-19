import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import Register from './Register';
import 'antd/dist/antd.css';
import './App.css';
import Login from './Login';
import Home from './Home';
import Detail from './Detail';
import { ForumProvider } from '../context/ForumContext';
import NewThread from './NewThread';
import NewCategory from './NewCategory';

function App() {
  return (
    <div>
        
      <BrowserRouter>
        <ForumProvider>
          <div>
            <Route path="/home" component={Home} /> 
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/thread/:id" component={Detail} />
            <Route path="/newthread" component={NewThread} />
            <Route path="/newcategory" component={NewCategory} />
          </div>
        </ForumProvider>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
