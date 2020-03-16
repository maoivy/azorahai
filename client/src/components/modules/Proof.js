import React from "react";
import InputDisplay from "./InputDisplay.js";

import "./Proof.css";

/**
 * Proof is a component for displaying each user's proof
 *
 * Proptypes
 * @param {Object} proof
 * @param {ObjectId} user id of user logged in
 * @param {function} deleteProof
 * @param {function} likeProof
 *
 **/
class Proof extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="proof-container">
        <div className="proof-content-container">
          <div className="proof-author">{this.props.proof.username}</div>
          <div className="proof-text">
            <InputDisplay text={this.props.proof.text} />
          </div>
        </div>
        <div className="proof-footer">
          <div className="proof-footer-left">
            {this.props.user && (
              <button
                className="proof-btn like-btn"
                onClick={() => this.props.likeProof(this.props.proof)}
              >
                like
              </button>
            )}
            <div className="likes-count">{this.props.proof.likes.length} likes</div>
          </div>
          {this.props.proof.user == this.props.user && (
            <button
              className="proof-btn delete-btn"
              onClick={() => this.props.deleteProof(this.props.proof)}
            >
              delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Proof;
