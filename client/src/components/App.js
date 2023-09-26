import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from 'react';
import Home from './Home'
import Signup from './Signup'
import Login from './Login'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    });
  }, [])

  function handleLogin(user) {
    setUser(user)
  }

  return (
    <div className="App">
      <h2>{ user ? `Hello, ${user.username}` : `Welcome!`}</h2>
      <button>{ user ? 'Logout' : 'Login'}</button>
      { user ? null : <button>Signup</button>}
      <Switch>
        <Route exact path='/'>
          <Home/>          
        </Route>
        <Route exact path='/signup'>
          <Signup user={user} handleLogin={handleLogin}/>
        </Route>
        <Route exact path='/login'>
          <Login user={user} handleLogin={handleLogin}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
