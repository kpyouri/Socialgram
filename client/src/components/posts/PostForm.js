import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';




class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      url: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      url: this.state.url,
      name: user.name,
<<<<<<< HEAD
      avatar: user.avatar,
      photo: user.avatar,
      url: this.state.url
    };

    this.props.addPost(newPost);
    //this.setState({ url: '' });
    //this.setState({ text: '' });
=======
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({
      text: '',
      url: ''
     });
>>>>>>> e0fe793a71571c3f2e4b3edcc70bbd5ad759ce66
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    //const {classes} = this.props;

    return (
      
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
<<<<<<< HEAD
               <TextAreaFieldGroup
                  placeholder="Post a url"
=======

                 <TextAreaFieldGroup
                  placeholder="Enter url"
>>>>>>> e0fe793a71571c3f2e4b3edcc70bbd5ad759ce66
                  name="url"
                  value={this.state.url}
                  onChange={this.onChange}
                  error={errors.url}
                />
              </div>
            
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);