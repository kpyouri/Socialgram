import React from 'react';
import { Link } from 'react-router-dom';
import Posts from '../posts/Posts';

const ProfileActions = () => {
  return (
    <div role="group">
    <div className="horizontal">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      {/* <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link> */}
      
    </div>
    <Posts/>
    </div>
  );
};

export default ProfileActions;
