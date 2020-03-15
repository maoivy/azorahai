import React from "react";
import "./Home.css";

import { get, post } from "../../utilities.js";
import { Helmet } from "react-helmet";
// import { navigate } from "@reach/router";

/**
 * Location is a component for displaying each location
 *
 * Proptypes
 * @param {Object} location
 *
 * The dropdown code is based off of a tutorial posted by gitconnected (see README for link)
 **/

class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="location-container">{this.props.location.name}</div>;
  }
}

/**
 * Home is a component for displaying the main screen with locations
 *
 * Proptypes
 * @param {userid} user id
 *
 * The dropdown code is based off of a tutorial posted by gitconnected (see README for link)
 **/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      newLocationName: null,
    };
  }

  componentDidMount() {
    get("/api/locations").then((locations) => this.setState({ locations: locations }));
  }

  handleCreateLocation = (name) => {
    post("/api/locations/new", { name: name }).then((newLocation) => {
      this.setState((prevState) => ({
        locations: prevState.locations.concat(newLocation),
        newLocationName: null,
      }));
    });
  };

  handleDeleteLocation = (location_id) => {
    post("/api/locations/delete", { _id: location_id });
  };

  render() {
    let greeting = "hello";
    if (this.props.username) {
      greeting += ", " + this.props.username.toLowerCase();
    }

    let locations = "no locations found... time to start adding some";
    if (this.state.locations) {
      console.log(this.state.locations);
      locations = this.state.locations.map((location, k) => (
        <Location key={k} location={location} />
      ));
    }

    return (
      <div className="page-container">
        <Helmet>
          <title>where did i put it</title>
        </Helmet>
        <div className="dashboard-container">
          <div className="greeting">{greeting}</div>
          <input
            type="text"
            value={this.state.newLocationName}
            onChange={(event) => this.setState({ newLocationName: event.target.value })}
          />
          <button
            className="add-btn"
            onClick={() => this.handleCreateLocation(this.state.newLocationName)}
          >
            add a location
          </button>
          {locations}
        </div>
      </div>
    );
  }
}

export default Home;
