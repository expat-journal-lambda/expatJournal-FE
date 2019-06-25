import React, { Component } from "react";

class StoryForm extends Component {
  state = {
    id: null,
    sName: "",
    sContent: "",
    user: null || 3,
    sCountry: ""
  };

  change = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  submit = evt => {
    evt.preventDefault();
  };

  render() {
    const { sName, sContent, sCountry } = this.props;
    return (
      <div>
        <form method="post" onSubmit={this.submit}>
          <div>
            <input
              type="text"
              name="sName"
              value={sName}
              onChange={this.change}
              placeholder="Story title"
            />
          </div>
          <div>
            <input
              type="text"
              name="sCountry"
              value={sCountry}
              onChange={this.change}
              placeholder="Country"
            />
          </div>
          <div>
            <textarea
              name="sContent"
              value={sContent}
              onChange={this.change}
              placeholder="Description"
            />
          </div>
          <div>
            <button type="submit">Add Story</button>
          </div>
        </form>
      </div>
    );
  }
}
export default StoryForm;
