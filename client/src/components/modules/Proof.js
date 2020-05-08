import React from "react";
import InputDisplay from "./InputDisplay.js";

import "./Proof.css";
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
 * Proof is a component for displaying each user's proof
 *
 * Proptypes
 * @param {Object} proof
 * @param {ObjectId} user id of user logged in
 * @param {function} deleteProof
 * @param {function} likeProof
 * @param {function} unlikeProof
 *
 **/
class Proof extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let likeButton = (
      <button className="proof-btn like-btn" disabled>
        like
      </button>
    );
    if (this.props.user) {
      if (this.props.proof.likes.indexOf(this.props.user) === -1) {
        likeButton = (
          <button
            className="proof-btn like-btn"
            onClick={() => this.props.likeProof(this.props.proof)}
          >
            like
          </button>
        );
      } else if (this.props.proof.likes.indexOf(this.props.user) !== -1) {
        likeButton = (
          <button
            className="proof-btn like-btn"
            onClick={() => this.props.unlikeProof(this.props.proof)}
          >
            unlike
          </button>
        );
      }
    }
    let likeLabel = "likes";
    if (this.props.proof.likecount == 1) {
      likeLabel = "like";
    }
    return (
      <div className="proof-container">
        <img className="proof-icon" src={SIGIL_MAP[this.props.proof.icon]} />
        <div className="proof-body-container">
          <div className="proof-content-container">
            <div className="proof-author">{this.props.proof.username}</div>
            <div className="proof-text">
              <InputDisplay text={this.props.proof.text} />
            </div>
          </div>
          <div className="proof-footer">
            <div className="proof-footer-left">
              {likeButton}
              <div className="likes-count">
                {this.props.proof.likecount} {likeLabel}
              </div>
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
      </div>
    );
  }
}

export default Proof;
