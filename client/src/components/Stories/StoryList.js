import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Story from "./Story";
import { fetchStories } from "../../actions/storyActions";

const propTypes = {
  stories: PropTypes.array.isRequired
};

class StoriesList extends Component {
  componentDidMount() {
    this.props.fetchStories();
  }
  render() {
    const { stories } = this.props;

    return (
      <div>
        {stories.map(story => (
          <Story key={story.id} story={story} />
        ))}
      </div>
    );
  }
}

StoriesList.propTypes = propTypes;

const mapStateToProps = state => ({
  stories: state.stories.stories
});

export default connect(
  mapStateToProps,
  { fetchStories }
)(StoriesList);
