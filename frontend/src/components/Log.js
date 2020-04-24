import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {signIn, signOut} from "../actions";


class Log extends Component {

  state = {
    password: "",
    username: ""
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state.username, this.state.password)
  }

  handleLogout = () => {
    this.props.signOut()
  }

  renderLoginForm = () => {
    return (
      <div className={"container LoginForm mt-3"}>
        <form className={"container col-lg-4"} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="usernameInput">Username</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              aria-describedby="emailHelp"
              name={'username'}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name={'password'}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }

  renderLogoutForm = () => {
    return (
      <div className={'container text-center mt-3'}>
        <h1>Hello {this.props.user.username}</h1>
        <p>Click to button bellow to logout</p>
        <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }

  renderForm = () => {
    if (this.props.loginInfos.isSignedIn) {
      return this.renderLogoutForm()
    } else {
      return this.renderLoginForm()
    }
  }

  render() {
    return (
      <Fragment>{this.renderForm()}</Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginInfos: state.login,
    user: state.users.current_user
  }
}


export default connect(
  mapStateToProps,
  {signIn, signOut})(Log)