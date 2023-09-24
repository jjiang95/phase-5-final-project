import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React from 'react';
import Home from './Home'
import Signup from './Signup'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home/>          
        </Route>
        <Route exact path='/signup'>
          <Signup/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
