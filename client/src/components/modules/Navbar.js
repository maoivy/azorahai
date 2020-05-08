import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";
import "../../utilities.css";
import tinfoil from "../../public/tinfoil.png";
import targaryen from "../../public/sigils/targaryen.png";
import baratheon from "../../public/sigils/baratheon.png";
import arryn from "../../public/sigils/arryn.png";
import greyjoy from "../../public/sigils/greyjoy.png";
import martell from "../../public/sigils/martell.png";
import lannister from "../../public/sigils/lannister.png";
import tully from "../../public/sigils/tully.png";
import tyrell from "../../public/sigils/tyrell.png";
import stark from "../../public/sigils/stark.png";

const SIGIL_MAP = {
  targaryen: targaryen,
  baratheon: baratheon,
  arryn: arryn,
  greyjoy: greyjoy,
  martell: martell,
  lannister: lannister,
  tully: tully,
  tyrell: tyrell,
  stark: stark,
};

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
    this.container = React.createRef();
    this.state = {
      menu: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        menu: false,
      });
    }
  };

  render() {
    return (
      <>
        <div className="navbar-container">
          <Link to="/" className="navbar-link">
            <img className="sigil" src={tinfoil} />
          </Link>
          <div className="navbar-links">
            {this.props.user ? (
              <div className="navbar-menu-container" ref={this.container}>
                <img
                  className="sigil"
                  src={SIGIL_MAP[this.props.icon]}
                  onClick={() => this.setState({ menu: true })}
                />
                {this.state.menu && (
                  <div className="navbar-dropdown">
                    <Link
                      to="/settings"
                      className="navbar-dropdown-link"
                      onClick={() => this.setState({ menu: false })}
                    >
                      Settings
                    </Link>
                    <GoogleLogout
                      className="logout-btn Navbar-opts_login"
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={this.props.handleLogout}
                      onFailure={(err) => console.log(err)}
                    />
                  </div>
                )}
              </div>
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
