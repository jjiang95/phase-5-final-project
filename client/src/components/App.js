import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React from 'react';
import Home from './Home'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home/>          
        </Route>
      </Switch>
    </div>
  );
}

export default App;
