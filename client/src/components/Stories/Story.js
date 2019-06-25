import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteStory } from "../../actions/storyActions";

class Story extends Component {
  render() {
    const { story, deleteStory } = this.props;
    return (
      <div>
        <h3>{story.sName}</h3>
        <span onClick={() => deleteStory(story.id)}>x</span>
      </div>
    );
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sName: PropTypes.string.isRequired,
    sContent: PropTypes.string.isRequired,
    user: PropTypes.number.isRequired
  }).isRequired
};

export default connect(
  null,
  { deleteStory }
)(Story);
