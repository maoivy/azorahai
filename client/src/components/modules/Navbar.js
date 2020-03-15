import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";
import "../../utilities.css";
// import logo from "../../../dist/C.png";

const GOOGLE_CLIENT_ID = "164562165892-i4it57327rduvh42atp6f6qpqdsrgamu.apps.googleusercontent.com";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="navbar-container">
          <Link to="/" className="navbar-link">
            a song of tin and foil
          </Link>
          <div className="navBar-linkContainer">
            {this.props.user ? (
              <>
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
