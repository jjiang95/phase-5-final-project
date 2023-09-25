import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from 'react';
import Home from './Home'
import Signup from './Signup'

function App() {

  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   fetch("/check_session")
  //   .then((res) => {
  //     if (res.ok) {
  //       res.json().then((user) => setUser(user))
  //     }
  //   });
  // }, [])

  function handleLogin(user) {
    setUser(user)
  }

  return (
    <div className="App">
      <h2>{ user ? `Hello, ${user.username}` : ''}</h2>
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
