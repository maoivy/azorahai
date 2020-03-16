import React from "react";
import Proof from "./Proof.js";
import Input from "./Input.js";

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

  submitNewProof = (proof) => {
    const params = {
      username: this.props.username,
      theory: this.props.theory,
      text: proof,
    };
    post("/api/proofs/new", params).then((newProof) =>
      this.setState((prevState) => ({ proofs: prevState.proofs.concat(newProof), newProof: "" }))
    );
  };

  deleteProof = (proof) => {
    const proofIndex = this.state.proofs.indexOf(proof);
    post("/api/proofs/delete", { proofId: proof._id }).then((deletedProof) => {
      const proofs = this.state.proofs;
      proofs.splice(proofIndex, 1);
      this.setState({
        proofs: proofs,
      });
    });
  };

  render() {
    let proofs = "Loading...";
    if (this.state.proofs) {
      proofs = this.state.proofs.map((proof, k) => (
        <Proof key={k} proof={proof} user={this.props.user} deleteProof={this.deleteProof} />
      ));
    }

    // if logged in, display new proof input
    let newProofInput = "Log in to submit a proof.";
    if (this.props.user) {
      newProofInput = (
        <>
          <Input submit={this.submitNewProof} />
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
