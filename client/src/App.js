import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import SignUp from "./components/sign-up.component";
import Profile from "./components/profile";

function App() {

  const [auth, setAuth] = useState()

  const isAuthenticated = () => {
    setAuth(auth = false)
  }


  return (<Router>
    <div className="App">
      <Navbar />

        <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp isAuthenticated={isAuthenticated}} />
            <Route path="/profile" component={Profile} />
        </Switch>

    </div>
    
    </Router>
  );
}

export default App;
