import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import UserPage from './UserPage'

function App() {
  const history = useHistory()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.status == 200) {
        r.json()
        .then((user) => setUser(user))
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user)
  }

  function handleLoginClick() {
    history.push('/login')
  }

  function handleSignupClick() {
    history.push('/signup')
  }

  function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
      setUser(null)
      }
    });
  }

  return (
    <div className="App">
      <h2>{ user ? `Hello, ${user.username}` : `Welcome!`}</h2>
      <button onClick={() => {history.push('/')}}>Home</button>
      { user ? <button onClick={() => {history.push(`/users/${user.username}`)}}>Profile</button> : null}
      <button onClick={user ? handleLogoutClick : handleLoginClick}>{ user ? 'Logout' : 'Login'}</button>
      { user ? null : <button onClick={handleSignupClick}>Signup</button>}
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
        <Route exact path='/users/:username'>
          <UserPage user={user}/>
        </Route>
        <Route exact path='/*'>
          <h1>404 -- Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
