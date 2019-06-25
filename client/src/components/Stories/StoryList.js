import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Story from "./Story";
import { fetchStories } from "../../actions/storyActions";
import styled from "styled-components";

const StyledStoryList = styled.div`
  width: 90%;
  margin: 1rem auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

class StoriesList extends Component {
  componentDidMount() {
    this.props.fetchStories();
  }
  render() {
    const { stories } = this.props;

    return (
      <StyledStoryList>
        {stories.map(story => (
          <Story key={story.id} story={story} />
        ))}
      </StyledStoryList>
    );
  }
}

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  stories: state.stories.stories
});

export default connect(
  mapStateToProps,
  { fetchStories }
)(StoriesList);
