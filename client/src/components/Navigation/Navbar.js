import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.header`
  background: #052135;
  color: #d3dadf;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 78px;
  overflow: hidden;

  .logo-div {
    flex: 1;
    padding-left: 4rem;
    font-family: "Lilita One", cursive;
    font-weight: 100;
    font-style: italic;
  }

  ul {
    flex: 1;
    display: flex;
    height: 78px;

    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        color: white;
        text-decoration: none;
        display: block;
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 1.6rem;
        padding-top: 1.6rem;
        font-size: 1.2rem;

        &:hover {
          background: #09314d;
        }
      }
    }
  }
`;

const Navbar = () => {
  return (
    <StyledNavBar>
      <div className="logo-div">
        <h1>ExpatStories</h1>
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-story">Create Story</NavLink>
        </li>
        <li>
          <NavLink to="/add-story">Login</NavLink>
        </li>
      </ul>
    </StyledNavBar>
  );
};

export default Navbar;
