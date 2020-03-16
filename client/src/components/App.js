import React, { Component } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Navbar from "./modules/Navbar.js";
import Home from "./pages/Home.js";
import Settings from "./pages/Settings.js";
import { Helmet } from "react-helmet";

import "../utilities.css";
import "./App.css";

import { get, post } from "../utilities.js";

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
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        this.setState({
          userId: user._id,
          username: user.username,
        });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, username: user.username });
      if (!user.username) {
        navigate("/settings");
      }
    });
  };

  handleLogout = () => {
    this.setState({ userId: null, username: "" });
    post("/api/logout");
  };

  handleSaveSettings = (username) => {
    const params = {
      username: username,
    };
    post("/api/settings", params).then((updatedUser) =>
      this.setState({ username: updatedUser.username })
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
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <div className="page-container">
          {needsToRegister ? (
            <Router>
              <Redirect noThrow={true} from="/" to="settings" />
              <Settings
                path="settings"
                username={this.state.username}
                handleSaveSettings={this.handleSaveSettings}
              />
              <NotFound default />
            </Router>
          ) : (
            <Router>
              <Home path="/" user={this.state.userId} username={this.state.username} />
              <Settings
                path="settings"
                username={this.state.username}
                handleSaveSettings={this.handleSaveSettings}
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
