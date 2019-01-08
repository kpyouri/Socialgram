import React, { Component } from 'react'
import './Landing.css'

import {Link} from 'react-router-dom';

class Landing extends Component {
  render() {
    return (

<div className="landing" >
    <div className="landing-inner text-light">
      <div className="container landing-container">
        <div className="row">
          <div className="col-md-12 text-center">
          <img className="logo" src="./img/instagram_logo.png" alt="socialgram logo"/>
            <p className="title">Socialgram</p>
            <p className="lead landing-desc"> Create a developer profile/portfolio, share posts and get help from other developers</p>
            <hr />
              <Link to="/register" className= "btn btn-lg btn-info mr-2">Sign Up</Link>
              <Link to="/login" className= "btn btn-lg btn-light">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Landing;