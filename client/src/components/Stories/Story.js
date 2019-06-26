import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteStory } from "../../actions/storyActions";
import styled from "styled-components";
import { IoMdCreate, IoIosClose } from "react-icons/io";

const StyledStory = styled.div`
  flex-basis: 30%;
  max-width: 30%;
  -ms-flex: auto;
  position: relative;
  margin: 1rem;
  box-sizing: border-box;
  background: white;
  -webkit-box-shadow: 0 5px 8px -3px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 5px 8px -3px rgba(0, 0, 0, 0.15);
  box-shadow: 0 5px 8px -3px rgba(0, 0, 0, 0.15);
`;

const StoryFooter = styled.div`
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 3rem;
`;

const Delete = styled(IoIosClose)`
  color: red;
  font-size: 2.5rem;
  margin: auto 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Edit = styled(Link)`
  color: green;
  font-size: 1.2rem;
  margin: auto 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
const StoryBody = styled.div`
  padding: 1rem;

  h3 {
    margin: 5px 0px;
    padding: 0px;
  }
`;

class Story extends Component {
  render() {
    const { story, deleteStory, userId } = this.props;
    return (
      <StyledStory>
        <StoryBody>
          <h3>{story.sName}</h3>
          <p>{story.sCountry}</p>
        </StoryBody>
        <StoryFooter>
          {userId ? (
            <React.Fragment>
              <Delete onClick={() => deleteStory(story.id)}>x</Delete>
              <Edit to={`/stories/edit/${story.id}`}>
                <IoMdCreate />
              </Edit>
            </React.Fragment>
          ) : (
            <a href="/#" className="btn btn-default">
              {story.username}
            </a>
          )}
        </StoryFooter>
      </StyledStory>
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

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(
  mapStateToProps,
  { deleteStory }
)(Story);
