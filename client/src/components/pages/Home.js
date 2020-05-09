import React from "react";
import ProofPage from "../pages/ProofPage.js";
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
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-container">
        <Helmet>
          <title>a song of tin and foil</title>
        </Helmet>
        <div className="home-container">hello</div>
      </div>
    );
  }
}

export default Home;
