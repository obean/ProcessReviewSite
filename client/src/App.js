import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import SignUp from "./components/sign-up.component";
import Profile from "./components/profile";

function App() {
  return (<Router>
    <div className="App">
      <Navbar />
      <Profile />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </div>
    
    </Router>
  );
}

export default App;
