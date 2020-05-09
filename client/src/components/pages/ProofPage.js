import React from "react";
import ProofBlock from "../modules/ProofBlock.js";
import "./ProofPage.css";

import { get, post } from "../../utilities.js";
import { Helmet } from "react-helmet";

/**
 * Home is a component for displaying the main screen
 *
 * Proptypes
 * @param {ObjectId} user id
 * @param {String} username (alias) of user logged in
 * @param {String} icon of user logged in
 **/
class ProofPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theory: null,
    };
  }

  componentDidMount() {
    get("/api/theories", { theoryId: this.props.theoryId }).then((theory) =>
      this.setState({ theory: theory })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      get("/api/theories", { theoryId: this.props.theoryId }).then((theory) =>
        this.setState({ theory: theory })
      );
    }
  }

  render() {
    let theoryText = "Loading...";
    let proofBlock = "Loading...";
    if (this.state.theory) {
      theoryText = this.state.theory.text;
      proofBlock = (
        <ProofBlock
          theory={this.state.theory._id}
          user={this.props.user}
          username={this.props.username}
          icon={this.props.icon}
        />
      );
    }

    return (
      <div className="page-container">
        <Helmet>
          <title>a song of tin and foil</title>
        </Helmet>
        <div className="proofpage-container">
          <div className="theory-container">{theoryText}</div>
          {proofBlock}
        </div>
      </div>
    );
  }
}

export default ProofPage;
