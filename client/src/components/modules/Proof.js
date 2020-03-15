import React from "react";

import "./Proof.css";

/**
 * Proof is a component for displaying each user's proof
 *
 * Proptypes
 * @param {Object} proof
 *
 **/
class Proof extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="proof-container">
        <div className="proof-author">{this.props.proof.user}</div>
        <div className="proof-text">{this.props.proof.text}</div>
      </div>
    );
  }
}

export default Proof;
