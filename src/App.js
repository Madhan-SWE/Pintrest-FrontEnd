import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Home from "./components/Home/Home"
import Header from "./components/Header/Header"
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import ActivateUser from "./components/User/ActivateUser";
import ForgotPassword from './components/User/ForgotPassword';
import ChangePassword from './components/User/ChangePassword';

import CreateBoard from "./components/Operations/CreateBoard"

function App() {

  function requireAuth(nextState, replace, next){
    next();
  }
  return (
      <div className="App container-fluid">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" onEnter={requireAuth}>
              <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route exact path="/activateuser/:token" render={(props) => <ActivateUser {...props} />} />
          <Route exact path="/changePassword/email/:email/token/:token" render={(props) => <ChangePassword {...props} />} />
          <Route exact path="/createBoard">
            <CreateBoard />
          </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
