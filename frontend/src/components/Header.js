import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {

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
              <Link className="nav-item nav-link" to={'/myposts'}>My Posts</Link>
              <Link className="nav-item nav-link" to={'/log'}>Login</Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;