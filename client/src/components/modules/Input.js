import React, { Component } from "react";

import "./Input.css";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";

/**
 * Input is a component for handling (large) text input boxes
 *
 * Proptypes
 * @param {function} submit the input
 * @param {ObjectId} user id
 *
 **/
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = (editorState) => {
      this.setState({
        editorState: editorState,
      });
    };
  }

  handleSubmit = () => {
    const contentState = this.state.editorState.getCurrentContent();
    if (contentState.hasText()) {
      const rawContentState = convertToRaw(contentState);
      const contentStateString = JSON.stringify(rawContentState);
      this.props.submit(contentStateString);
      this.setState({
        editorState: EditorState.createEmpty(),
      });
    }
  };

  render() {
    let submitClassName = "submit-btn";
    if (!this.state.editorState.getCurrentContent().hasText()) {
      submitClassName = "submit-btn-inactive";
    }

    return (
      <div className="input-container">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.mapKeyBindings}
          placeholder="Start making your case..."
        />
        <div className="input-footer">
          <button className={submitClassName} onClick={() => this.handleSubmit()}>
            Post
          </button>
        </div>
      </div>
    );
  }
}

export default Input;
