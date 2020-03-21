import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";
import "../../utilities.css";
import tinfoil from "../../public/tinfoil.png";
import targaryen from "../../public/targaryen.png";

const GOOGLE_CLIENT_ID = "164562165892-i4it57327rduvh42atp6f6qpqdsrgamu.apps.googleusercontent.com";

/**
 * Navbar is a component for letting the user navigate pages
 *
 * Proptypes
 * @param {ObjectId} user id
 * @param {String} icon of user logged in
 * @param {function} handleLogin
 * @param {function} handleLogout
 *
 **/
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="navbar-container">
          <Link to="/" className="navbar-link">
            <img className="sigil" src={tinfoil} />
          </Link>
          <div className="navbar-links">
            {this.props.user ? (
              <>
                <img className="sigil" src={targaryen} />
                <GoogleLogout
                  className="logout-btn Navbar-opts_login"
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={this.props.handleLogout}
                  onFailure={(err) => console.log(err)}
                />
              </>
            ) : (
              <GoogleLogin
                className="Navbar-opts_login"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
