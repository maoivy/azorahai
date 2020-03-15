import React from "react";
import Proof from "./Proof.js";

import "./ProofBlock.css";

import { get, post } from "../../utilities.js";

/**
 * Home is a component for displaying the main screen
 *
 * Proptypes
 * @param {ObjectId} theory id
 * @param {ObjectId} user id
 *
 **/
class ProofBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proofs: [],
      newProof: "",
    };
  }

  componentDidMount() {
    get("/api/proofs", { theory: this.props.theory }).then((proofs) =>
      this.setState({ proofs: proofs })
    );
  }

  submitNewProof = () => {
    if (this.state.newProof) {
      const params = {
        theory: this.props.theory,
        text: this.state.newProof,
      };
      post("/api/proofs", params).then((newProof) =>
        this.setState((prevState) => ({ proofs: prevState.proofs.concat(newProof), newProof: "" }))
      );
    }
  };

  render() {
    let proofs = "Loading...";
    if (this.state.proofs) {
      proofs = this.state.proofs.map((proof, k) => <Proof key={k} proof={proof} />);
    }

    // if logged in, display new proof input
    let newProofInput = "Log in to submit a proof.";
    if (this.props.user) {
      newProofInput = (
        <>
          <input
            type="text"
            value={this.state.newProof}
            className="proof-input"
            onChange={(event) => this.setState({ newProof: event.target.value })}
          ></input>
          <button className="proof-btn" onClick={() => this.submitNewProof()}>
            Post
          </button>
        </>
      );
    }

    return (
      <div className="proofblock-container">
        {newProofInput}
        {proofs}
      </div>
    );
  }
}

export default ProofBlock;
