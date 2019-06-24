import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  stories: PropTypes.array.isRequired
};

class StoriesList extends Component {
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

export default StoriesList;
