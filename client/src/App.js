import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Profiles from './components/profiles/Profiles'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/profiles" component={Profiles} />
          {/* <Route exact path="/profiles" component={Profiles}/> */}
          </div>
        </Switch> 
        
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
