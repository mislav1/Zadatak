import React from "react";

export default class MyModal extends React.Component {
  onClose = () => {
    this.props.handleClose();
  };
  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Modal Window</h2>
        <div class="content">{this.props.children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}
