import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Partage from './components/pages/Services';
import Activites from './components/pages/Activites';
import FormSignup from './components/FormSignUp';
import Success from "./components/pages/Success";
import NotFound from "./components/pages/NotFound";
import FormSignin from './components/FormSignIn';
import Conditions from './components/pages/Conditions';
import Objectifs from './components/pages/Objectifs';
import Distance from './components/pages/Encodage_distance';
import Score from './components/pages/Encodage_score';
import {isLoggedIn} from './components/auth.js';
import Profile from "./components/pages/Profile";
import { PrivateRoute } from "./components/PrivateRoute.js";
import Contact from "./components/pages/Contact";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute exact isloggedin={isLoggedIn()} path="/objectifs" component={Objectifs} />
          <PrivateRoute exact isloggedin={isLoggedIn()} path="/encodage_distance" component={Distance} />
          <PrivateRoute exact isloggedin={isLoggedIn()} path="/encodage_score" component={Score} />
          <PrivateRoute exact isloggedin={isLoggedIn()} path='/profile' component={Profile} />
          <Route path='/partage' component={Partage} />
          <Route path='/activites' component={Activites} />
          <Route path='/sign-up' component={FormSignup} />
          <Route path='/login' component={FormSignin} />
          <Route path='/conditions' component={Conditions} />
          <Route path='/success' component={Success} />
          <Route path='/contact' component={Contact} />

          <Route component={NotFound} />

        </Switch>
      </Router>
    </>
  );
}

export default App;