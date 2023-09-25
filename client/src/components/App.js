import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useState } from 'react';
import Home from './Home'
import Signup from './Signup'

function App() {

  const [user, setUser] = useState(null)

  function handleLogin(user) {
    setUser(user)
  }

  return (
    <div className="App">
      <h2>{ user ? user.username : ''}</h2>
      <Switch>
        <Route exact path='/'>
          <Home/>          
        </Route>
        <Route exact path='/signup'>
          <Signup handleLogin={handleLogin}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
