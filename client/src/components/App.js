import React, { Component } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Navbar from "./modules/Navbar.js";
import Home from "./pages/Home.js";
import ProofPage from "./pages/ProofPage.js";
import Settings from "./pages/Settings.js";
import { Helmet } from "react-helmet";

import "../utilities.css";
import "./App.css";

import { get, post } from "../utilities.js";

import targaryen from "../public/sigils/targaryen.png";
import baratheon from "../public/sigils/baratheon.png";
import arryn from "../public/sigils/arryn.png";
import greyjoy from "../public/sigils/greyjoy.png";
import martell from "../public/sigils/martell.png";
import lannister from "../public/sigils/lannister.png";
import tully from "../public/sigils/tully.png";
import tyrell from "../public/sigils/tyrell.png";
import stark from "../public/sigils/stark.png";

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

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: "",
      icon: "",
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        this.setState({
          userId: user._id,
          username: user.username,
          icon: user.icon,
        });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, username: user.username, icon: user.icon });
      if (!user.username) {
        navigate("/settings");
      }
    });
  };

  handleLogout = () => {
    this.setState({ userId: null, username: "" });
    post("/api/logout");
  };

  changeUsername = (username) => {
    const params = {
      username: username,
    };
    post("/api/settings/username", params).then((updatedUser) =>
      this.setState({ username: updatedUser.username })
    );
  };

  changeIcon = (icon) => {
    const params = {
      icon: icon,
    };
    post("/api/settings/icon", params).then((updatedUser) =>
      this.setState({ icon: updatedUser.icon })
    );
  };

  render() {
    let needsToRegister = false;
    if (this.state.userId && !this.state.username) {
      needsToRegister = true;
    }
    return (
      <>
        <Helmet>
          <title>a song of tin and foil</title>
        </Helmet>
        <Navbar
          user={this.state.userId}
          icon={this.state.icon}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          SIGIL_MAP={SIGIL_MAP}
        />
        <div className="page-container">
          {needsToRegister ? (
            <Router>
              <Redirect noThrow={true} from="/" to="settings" />
              <Settings
                path="settings"
                username={this.state.username}
                icon={this.state.icon}
                changeUsername={this.changeUsername}
                changeIcon={this.changeIcon}
                SIGIL_MAP={SIGIL_MAP}
              />
              <NotFound default />
            </Router>
          ) : (
            <Router>
              <Home
                path="/"
                user={this.state.userId}
                username={this.state.username}
                icon={this.state.icon}
              />
              <ProofPage
                path="/:theoryId"
                user={this.state.userId}
                username={this.state.username}
                icon={this.state.icon}
              />
              <Settings
                path="settings"
                username={this.state.username}
                icon={this.state.icon}
                changeUsername={this.changeUsername}
                changeIcon={this.changeIcon}
                SIGIL_MAP={SIGIL_MAP}
              />
              <NotFound default />
            </Router>
          )}
        </div>
      </>
    );
  }
}

export default App;
