import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import SignUp from "./components/sign-up.component";
import Profile from "./components/profile";
import Review from "./components/review"

function App() {


  return (<Router>
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Review} />
        <Route path="/reviews" component={Review} />
      </Switch>

    </div>

  </Router>
  );
}

export default App;
