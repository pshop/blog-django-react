import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signIn} from "../actions";

class Header extends Component {

  componentDidMount() {
    if (!this.props.loginInfos.isSignedIn && localStorage.getItem('access_token')) {
      this.props.signIn()
    }
  }

  renderAuthText() {
    if (this.props.loginInfos.isSignedIn) {
      return (
        <Fragment>
          <Link className="nav-item nav-link" to={'/UserPage'}>My Posts</Link>
          <Link className={"nav-item nav-link"} to={'/geography'}>Geography</Link>
          <Link className="nav-item nav-link" to={'/log'}>Logout</Link>
        </Fragment>
      )
    } else {
      return (
        <Link className="nav-item nav-link" to={'/log'}>Login</Link>
      )
    }
  }

  render() {
    return (
      <div className={'container'}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Blog</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link active" to={'/'}>Home <span className="sr-only">(current)</span></Link>
              {this.renderAuthText()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {loginInfos: state.login}
}

export default connect(
  mapStateToProps,
  {signIn})(Header)