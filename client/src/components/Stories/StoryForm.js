import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStory,
  getStory,
  fetchStories,
  editingStory,
  updateStory
} from "../../actions/storyActions";
import { StyledFormWrapper, StoryImage, StyledForm } from "./_StoryFormStyles";

const cloudinaryBaseUrl =
  "https://api.cloudinary.com/v1_1/drwm2jwpk/image/upload";
const uploadPresetName = "zk6xp044";

class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.story ? props.story.id : "",
      sName: props.story ? props.story.sName : "",
      sContent: props.story ? props.story.sContent : "",
      user: null || 3,
      sCountry: props.story && props.story.sCountry ? props.story.sCountry : "",
      url: null
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

  handleImage = evt => {
    const file = evt.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPresetName);

    fetch(cloudinaryBaseUrl, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          this.setState({ ...this.state, url: data.secure_url });
        }
      })
      .catch(err => console.error(err));
  };

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
    const { sName, sContent, sCountry, url } = this.state;
    const { editing } = this.props;
    const formTitle = editing ? "Edit Story" : "Add Story";

    return (
      <StyledFormWrapper>
        <StyledForm method="post" onSubmit={this.submit}>
          <h2>{formTitle}</h2>
          <div>
            <input
              autoFocus
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
            <input
              type="file"
              name="image"
              onChange={e => this.handleImage(e)}
            />
          </div>
          {url && (
            <StoryImage>
              <img src={url} alt={sName} />
            </StoryImage>
          )}
          <div>
            {editing ? (
              <button type="submit" className="btn">
                Update Story
              </button>
            ) : (
              <button type="submit" className="btn">
                Add Story
              </button>
            )}
          </div>
        </StyledForm>
      </StyledFormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  editing: state.stories.editing,
  currentStory: state.stories.currentStory,
  story: state.stories.currentStory
    ? state.stories.stories.find(st => state.stories.currentStory === st.id)
    : { sName: "", sContent: "", sCountry: "" }
});

export default connect(
  mapStateToProps,
  { addStory, getStory, fetchStories, editingStory, updateStory }
)(StoryForm);
