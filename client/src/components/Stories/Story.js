import React from "react";
import PropTypes from "prop-types";

const Story = ({ story }) => {
  return (
    <div>
      <h3>{story.sName}</h3>
    </div>
  );
};

Story.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sName: PropTypes.string.isRequired,
    sContent: PropTypes.string.isRequired,
    sUser: PropTypes.number.isRequired
  }).isRequired
};

export default Story;
