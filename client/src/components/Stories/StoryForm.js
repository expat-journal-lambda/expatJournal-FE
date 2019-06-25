import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStory,
  getStory,
  fetchStories,
  editingStory,
  updateStory
} from "../../actions/storyActions";

class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.story ? props.story.id : "",
      sName: props.story ? props.story.sName : "",
      sContent: props.story ? props.story.sContent : "",
      user: null || 3,
      sCountry: props.story ? props.story.sCountry : ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStories();

    if (id) {
      this.props.getStory(id);
    } else {
      this.props.editingStory(false);
      this.setState({ sName: "", sContent: "", sCountry: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { story } = nextProps;
    this.setState({
      id: story ? story.id : "",
      sName: story ? story.sName : "",
      sContent: story ? story.sContent : "",
      user: null || 3,
      sCountry: story && story.sCountry ? story.sCountry : ""
    });
  }

  change = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  submit = evt => {
    const { editing } = this.props;
    evt.preventDefault();
    if (editing) {
      this.props.updateStory(this.state);
      this.props.history.push("/");
    } else {
      this.props.addStory(this.state);
      this.props.history.push("/");
    }
  };

  render() {
    const { sName, sContent, sCountry } = this.state;
    const { editing } = this.props;
    const formTitle = editing ? "Edit Story" : "Add Story";

    return (
      <div>
        <form method="post" onSubmit={this.submit}>
          <h3>{formTitle}</h3>
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
            {editing ? (
              <button type="submit">Update Story</button>
            ) : (
              <button type="submit">Add Story</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editing: state.stories.editing,
  currentStory: state.stories.currentStory,
  story: state.stories.stories.find(st => state.stories.currentStory === st.id)
});

export default connect(
  mapStateToProps,
  { addStory, getStory, fetchStories, editingStory, updateStory }
)(StoryForm);
