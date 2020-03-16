import React, { Component } from "react";

import "./Input.css";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

/**
 * InputDisplay is a component for displaying readonly inputs
 *
 * Proptypes
 * @param {function} submit the input
 * @param {ObjectId} user id
 *
 **/
class InputDisplay extends React.Component {
  constructor(props) {
    super(props);
    const rawContentState = JSON.parse(this.props.text);
    const convertedContentState = convertFromRaw(rawContentState);
    this.state = {
      editorState: EditorState.createWithContent(convertedContentState),
    };
  }

  render() {
    return (
      <div className="inputdisplay-container">
        <Editor editorState={this.state.editorState} readOnly={true} />
      </div>
    );
  }
}

export default InputDisplay;
