import React, {Component} from 'react';
import {connect} from 'react-redux';

import {signIn} from "../actions";


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

  render() {
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
    );
  }
}

const mapStateToProps = state => {
  return {loginInfos: state.login}
}


export default connect(
  mapStateToProps,
  {signIn})(Log)