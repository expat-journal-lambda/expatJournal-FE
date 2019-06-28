import React, { Component } from "react";
import { connect } from "react-redux";
import { getStory, fetchStories } from "../../actions/storyActions";
import styled from "styled-components";
const sectionDivider = require("../../images/section-divider.png");

const StyledSingleStory = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding: 2rem 6rem;
  border-radius: 5px;
  background: white;

  .story-content {
    font-size: 1.1rem;
    line-height: 2.5rem;
    margin-top: 3rem;
  }
`;

const Divider = styled.img`
  background-image: url(sectionDivider);
  display: block;
  height: 30px;
  margin: 3rem auto;
`;

const PageTitle = styled.h2`
  text-align: center;
`;

class SingleStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sName: props.story ? props.story.sName : "",
      sContent: props.story ? props.story.sContent : "",
      sCountry: props.story ? props.story.sCountry : ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStories();
    this.props.getStory(id);
    this.setState({
      sName: this.props.story ? this.props.story.sName : "",
      sContent: this.props.story ? this.props.story.sContent : "",
      sCountry: this.props.story ? this.props.story.sCountry : ""
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sName: nextProps.story ? nextProps.story.sName : "",
      sContent: nextProps.story ? nextProps.story.sContent : "",
      sCountry: nextProps.story ? nextProps.story.sCountry : ""
    });
  }

  render() {
    const { sName, sContent } = this.state;

    return (
      <StyledSingleStory>
        <PageTitle>{sName}</PageTitle>
        <Divider src={sectionDivider} />
        <div dangerouslySetInnerHTML={{ __html: sContent }} />
      </StyledSingleStory>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    return {
      story: state.stories.stories.find(
        st => st.id === Number(props.match.params.id)
      )
    };
  }
  return {
    story: state.stories.stories.find(
      st => st.id === state.stories.currentStory
    )
  };
};

export default connect(
  mapStateToProps,
  { getStory, fetchStories }
)(SingleStory);
