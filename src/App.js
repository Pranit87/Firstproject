import React from 'react';
import {Route,Switch} from "react-router-dom";
import About from './Components/About';
import Contact from './Components/Forms';
import Home from './Components/Home';


const App = () => {
  return (
    <div>
      <Switch>
        <Route path = "/About" component = {About}/>

      </Switch>
      {/* <About/>
      <Contact/> */}

    </div>
  );
}
 
export default App;
