import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Posts from '../posts/Posts';
import ProfileActions from './ProfileActions';


class Dashboard extends Component {
  render() {
    return(
    <div>
    <ProfileActions/>
    <Posts/>
    </div>
    )
    }
  }
export default Dashboard;
