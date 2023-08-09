
import './App.css';

import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App=()=> {
const [progress, setProgress] = useState(0);

  
 /* const setProgress= (progress)=>{
    this.setState({progress:progress})
  }*/

  
    return (
      <>
      <Router>
      <div>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
        
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="home" Country={"in"} Category={"general"}/>}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" Country={"in"} Category={"business"}/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" Country={"in"} Category={"entertainment"}/>}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} key="general" Country={"in"} Category={"general"}/>}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" Country={"in"} Category={"health"}/>}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" Country={"in"} Category={"science"}/>}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" Country={"in"} Category={"sports"}/>}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" Country={"in"} Category={"technology"}/>}></Route>
          </Routes>

        
        
      </div>
      </Router>
      </>
    );
  
}

export default App;