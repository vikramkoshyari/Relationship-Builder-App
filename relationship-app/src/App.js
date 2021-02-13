import './App.css';
import {Component} from 'react';
import 'antd/dist/antd.dark.css';
import T from './Table/table';
import Add from './Add/Add'
import Degree from './seperation/Degree'

class App extends Component{

 

 render(){
  return ( 
    <div className="App">
      
     <Add/>
      <Degree/>
    </div>
  );
 } 
 
}

export default App;
