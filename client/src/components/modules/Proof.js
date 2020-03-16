import React from "react";

import "./Proof.css";

/**
 * Proof is a component for displaying each user's proof
 *
 * Proptypes
 * @param {Object} proof
 * @param {ObjectId} user id of user logged in
 * @param {function} deleteProof
 *
 **/
class Proof extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="proof-container">
        <div className="proof-author">{this.props.proof.username}</div>
        <div className="proof-text">{this.props.proof.text}</div>
        {this.props.proof.user == this.props.user && (
          <button className="delete-btn" onClick={() => this.props.deleteProof(this.props.proof)}>
            delete
          </button>
        )}
      </div>
    );
  }
}

export default Proof;
