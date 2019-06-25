import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStory,
  getStory,
  fetchStories,
  editingStory,
  updateStory
} from "../../actions/storyActions";
import styled from "styled-components";

const StyledFormWrapper = styled.div`
  background: white;
  width: 80%;
  margin: 1rem auto;
  padding: 4rem 0rem 4rem 0rem;
  border-radius: 5px;
`;

const StyledForm = styled.form`
  width: 80%;
  margin: 1rem auto;

  input,
  textarea {
    width: 100%;
    font-size: 1.35rem;
    padding: 1rem;
    margin: 0.51rem auto;
    outline: none;
    font-family: "Montserrat", sans-serif;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }
  h2 {
    text-align: center;
  }
  .btn {
    width: 100%;
    font-size: 1.3rem;
    padding: 0.9em;
    border: 1px solid transparent;
    color: white;
    background: #09314d;
    border-radius: 0.3em;

    &:hover {
    }
  }
`;

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
  story: state.stories.stories.find(st => state.stories.currentStory === st.id)
});

export default connect(
  mapStateToProps,
  { addStory, getStory, fetchStories, editingStory, updateStory }
)(StoryForm);
