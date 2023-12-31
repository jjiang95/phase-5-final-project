import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import UserPage from './UserPage';
import PromptPage from './PromptPage';
import NewPrompt from './NewPrompt';
import Nav from './Nav';
function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/check_session`)
    .then((r) => {
      if (r.status === 200) {
        r.json()
        .then((user) => setUser(user))
      } 
    });
  }, []);

  function handleLogin(user) {
    setUser(user)
  }

  function handleLogoutClick() {
    fetch(`/logout`, {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
      setUser(null)
      }
    });
  }

  return (
    <>
      <Nav user={user} onLogout={handleLogoutClick}/>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Home/>          
          </Route>
          <Route exact path='/createaccount'>
            <Signup user={user} handleLogin={handleLogin}/>
          </Route>
          <Route exact path='/signin'>
            <Login user={user} handleLogin={handleLogin}/>
          </Route>
          <Route exact path='/profile/:username'>
            <UserPage user={user} setUser={setUser}/>
          </Route>
          <Route exact path='/prompt/:id'>
            <PromptPage user={user}/>
          </Route>
          <Route exact path='/newprompt'>
            <NewPrompt user={user}/>
          </Route>
          <Route exact path='/*'>
            <h1>404 -- Not Found</h1>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
