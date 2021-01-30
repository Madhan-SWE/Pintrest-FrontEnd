import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Home from "./components/Home/Home"
import Header from "./components/Header/Header"
import Register from "./components/User/Register";

const Login = () => {
  return(
    <div>Login</div>
  );
}

function App() {
  return (
      <div className="App container-fluid">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
        </Router>
      </div>
  );
}

export default App;
