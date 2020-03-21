import React from "react";

import "./Settings.css";

import { get, post } from "../../utilities.js";

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
    };
  }

  render() {
    return (
      <div className="settings-container">
        <h1>settings</h1>
        <div className="settings-label">username</div>
        <input
          type="text"
          className="settings-input"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        ></input>
        <button
          className="settings-btn"
          onClick={() => this.props.changeUsername(this.state.username)}
        >
          Change username
        </button>
        <div className="settings-label">icon</div>
        <div className="sigils-container">
          {Object.keys(SIGIL_MAP).map((sigil, k) => {
            let sigilClassName = "settings-sigil";
            if (sigil == this.state.icon) {
              sigilClassName += " selected";
            }
            return (
              <img
                key={k}
                src={SIGIL_MAP[sigil]}
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
