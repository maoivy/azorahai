import React from "react";

import { get, post } from "../../utilities.js";

/**
 * Settings is a component letting the user change their account
 *
 * Proptypes
 * @param {function} handleSaveSettings to pass settings changes to App.js
 *
 **/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
    };
  }

  render() {
    return (
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="settings-label">username</div>
        <input
          type="text"
          className="settings-input"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        ></input>
        <button
          className="settings-btn"
          onClick={() => this.props.handleSaveSettings(this.state.username)}
        >
          Save
        </button>
      </div>
    );
  }
}

export default Settings;
