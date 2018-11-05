import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import './Navbar.css';
import {Link} from 'react-router-dom';


class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

render() {
  const {isAuthenticated, user} = this.props.auth;

  const authLinks = (
    <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/feed"> Post feed
            </Link>
          </li>         
          <li className="nav-item">
              <Link to="/edit-profile" className="nav-link">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link></li>
      

          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
          <a href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link">
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{width: '25px', marginRight: '5px'}}
                title="You must have a gravatar connected to your email to display an image"/ >{''}
            Logout
            </a>
          </li>
        </ul>
  );

const guestLinks = (
  <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register"> Sign Up
            </Link>
          </li> 
          <li className="nav-item">
          <Link className="nav-item" to="/login">Login</Link>
          </li>        
        </ul>
);

    return (
<nav className="navbar navbar-container navbar-expand-sm ">

{/* navbar-dark bg-dark mb-4 */}

    <div className="container">
      <Link className="navbar-brand"  to="/"><i className="fab fa-instagram"></i></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles"> 
            {''}
            Socialgram
            </Link>
          </li>
        </ul>

        {/* <ul className="navbar-nav ml-auto"> */}
        
        {/* Once Register authenticates already existing user- this code will work. This is to show Edit Profile when user logs in and if it's newcomers, they won't see this edit profile. Need logic for this code to run */}
          
          {/* <li className="nav-item">
              <Link to="/edit-profile" className="nav-link">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link></li> */}
      
      {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  </nav>

    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);
