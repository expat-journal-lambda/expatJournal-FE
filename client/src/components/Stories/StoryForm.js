import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStory,
  getStory,
  fetchStories,
  editingStory,
  updateStory,
  currentStory
} from "../../actions/storyActions";
import {
  StyledFormWrapper,
  StyledForm,
  ImageWrapper
} from "./_StoryFormStyles";

import { IoIosCamera } from "react-icons/io";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
      sImageUrl: props.story ? props.story.sImageUrl : null,
      imageUploading: false
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
      sImageUrl: story ? story.sImageUrl : "",
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

    this.setState({ imageUploading: true });
    fetch(cloudinaryBaseUrl, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          this.setState({ ...this.state, sImageUrl: data.secure_url });
        }
      })
      .catch(err => console.error(err))
      .finally(() => this.setState({ imageUploading: false }));
  };

  change = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  submit = evt => {
    evt.preventDefault();
    const { editing } = this.props;
    const newStory = {
      sName: this.state.sName,
      sContent: this.state.sContent,
      user: null || 3,
      sCountry: this.state.sCountry,
      sImageUrl: this.state.sImageUrl
    };
    const storyToUpdate = {
      id: this.state.id,
      sName: this.state.sName,
      sContent: this.state.sContent,
      user: null || 3,
      sCountry: this.state.sCountry,
      sImageUrl: this.state.sImageUrl
    };

    console.log("To Update", storyToUpdate);

    if (editing) {
      this.props.updateStory(storyToUpdate);
      this.props.history.push("/");
      this.setState({
        id: "",
        sName: "",
        sContent: "",
        user: null || 3,
        sCountry: ""
      });
      this.props.currentStory(null);
    } else {
      this.props.addStory(newStory);
      this.props.history.push("/");
      this.setState({
        id: "",
        sName: "",
        sContent: "",
        user: null || 3,
        sCountry: ""
      });
    }
  };

  render() {
    const { sName, sContent, sCountry, sImageUrl, imageUploading } = this.state;
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
          <div style={{ marginBottom: "1rem" }}>
            {/* <textarea
              name="sContent"
              value={sContent}
              onChange={this.change}
              placeholder="Description"
            /> */}
            <CKEditor
              editor={ClassicEditor}
              data={sContent}
              onInit={editor => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ ...this.state, sContent: data });
              }}
              onBlur={editor => {
                console.log("Blur.", editor);
              }}
              onFocus={editor => {
                console.log("Focus.", editor);
              }}
            />
          </div>
          <ImageWrapper
            onClick={e => {
              this.fileUpload.click();
            }}
          >
            <input
              type="file"
              name="image"
              ref={input => (this.fileUpload = input)}
              onChange={e => this.handleImage(e)}
            />
            <div className="image-placeholder">
              {imageUploading && <h1>Uploading...</h1>}
              {sImageUrl && !imageUploading && (
                <img src={sImageUrl} alt={sName} />
              )}
              {!sImageUrl && !imageUploading && (
                <div className="upload-label">
                  <IoIosCamera style={{}} size={80} />
                  <p>
                    <b>Click here</b> to upload your files to upload
                  </p>
                </div>
              )}
            </div>
          </ImageWrapper>

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
  { addStory, getStory, fetchStories, editingStory, updateStory, currentStory }
)(StoryForm);
