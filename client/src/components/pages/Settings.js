import React from "react";

import "./Settings.css";

import { get, post } from "../../utilities.js";

/**
 * Settings is a component letting the user change their account
 *
 * Proptypes
 * @param {String} username
 * @param {String} icon
 * @param {function} changeUsername to pass settings changes to App.js
 * @param {function} changeIcon
 *
 **/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      icon: this.props.icon,
      status: null,
    };
  }

  handleUsernameEntry = (event) => {
    this.setState({ username: event.target.value });
    get("/api/users", { username: event.target.value }).then((report) => {
      this.setState({ status: report.status });
    });
  };

  handleUsernameSubmit = () => {
    if (this.state.status == "available") {
      this.props.changeUsername(this.state.username);
      this.setState({ status: null });
    }
  };

  render() {
    let usernameButton = (
      <button className="settings-btn" disabled>
        Change username
      </button>
    );
    if (this.state.status == "available") {
      usernameButton = (
        <button className="settings-btn" onClick={() => this.handleUsernameSubmit}>
          Change username
        </button>
      );
    }
    return (
      <div className="settings-container">
        <h1>settings</h1>
        <div className="settings-label">username</div>
        <input
          type="text"
          className="settings-input"
          value={this.state.username}
          onChange={(event) => this.handleUsernameEntry(event)}
        ></input>
        {usernameButton}
        <p className="username-availability">{this.state.status}</p>
        <div className="settings-label">icon</div>
        <div className="sigils-container">
          {Object.keys(this.props.SIGIL_MAP).map((sigil, k) => {
            let sigilClassName = "settings-sigil";
            if (sigil == this.state.icon) {
              sigilClassName += " selected";
            }
            return (
              <img
                key={k}
                src={this.props.SIGIL_MAP[sigil]}
                className={sigilClassName}
                onMouseDown={() => this.setState({ icon: sigil })}
                onMouseUp={() => this.props.changeIcon(this.state.icon)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Settings;
