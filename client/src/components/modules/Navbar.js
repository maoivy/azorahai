import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";
import "../../utilities.css";
import { get, post } from "../../utilities.js";

import tinfoil from "../../public/tinfoil.png";

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
      theoryId: null,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    get("/api/random").then((theory) => this.setState({ theoryId: theory._id }));
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

  getRandomTheory = () => {
    get("/api/random").then((theory) => this.setState({ theoryId: theory._id }));
  };

  render() {
    return (
      <>
        <div className="navbar-container">
          <Link to="/" className="navbar-link">
            <img className="sigil" src={tinfoil} />
          </Link>
          <Link
            to={`/${this.state.theoryId}`}
            className="navbar-link"
            onMouseDown={() => this.getRandomTheory()}
          >
            random theory
          </Link>
          <div className="navbar-links">
            {this.props.user ? (
              <div className="navbar-menu-container" ref={this.container}>
                <img
                  className="sigil"
                  src={this.props.SIGIL_MAP[this.props.icon]}
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
                    <div className="navbar-login" onClick={() => this.setState({ menu: false })}>
                      <GoogleLogout
                        className="logout-btn Navbar-opts_login"
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
                        onFailure={(err) => console.log(err)}
                      />
                    </div>
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
