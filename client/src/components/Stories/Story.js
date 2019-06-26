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

  .story-image {
    width: 100%;
    height: 290px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
    }

    span {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      border: 1px solid transparent;
      background: rgba(0, 0, 0, 0.15);
      padding: 0.3rem 1rem;
      color: white;
      border-radius: 5px;
    }
  }
`;

const StoryFooter = styled.div`
  width: 100%;
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .post-title {
    padding: 0.5rem 0.5rem 0rem 0.5rem;
  }

  .post-details {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;

    .action-btns {
      width: 9rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
    }
  }
`;

const Delete = styled(IoIosClose)`
  color: red;
  font-size: 2.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const Edit = styled(Link)`
  color: green;
  font-size: 1.2rem;
  margin: auto 1rem auto 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;

class Story extends Component {
  render() {
    const { story, deleteStory, userId } = this.props;
    return (
      <StyledStory>
        <div className="story-image">
          <img src={story.image} alt={story.sName} />
          {story.sCountry && <span>{story.sCountry}</span>}
        </div>
        <StoryFooter>
          <div className="post-title">
            <h3>{story.sName}</h3>
          </div>
          <div className="post-details">
            <div className="user-info">
              <img src={story.avatar} alt={story.username} />
              <span>{story.username}</span>
            </div>
            {userId && (
              <div className="action-btns">
                <Delete onClick={() => deleteStory(story.id)}>x</Delete>
                <Edit to={`/stories/edit/${story.id}`}>
                  <IoMdCreate />
                </Edit>
              </div>
            )}
          </div>
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
