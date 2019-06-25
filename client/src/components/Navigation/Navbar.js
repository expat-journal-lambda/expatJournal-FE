import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNavBar } from "./_NavbarStyle";
import Login from "./modals/Login";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }
  openLoginModal = () => {
    this.setState({ modalOpen: true });
  };

  afterOpenLoginModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  };
  openModal = () => {
    this.setState({ modalOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <StyledNavBar>
        <Login
          modalOpen={modalOpen}
          closeModal={this.closeModal}
          afterOpenLoginModal={this.afterOpenLoginModal}
        />

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
            <a
              href="/#"
              onClick={e => {
                e.preventDefault();
                this.openLoginModal();
              }}
            >
              Login
            </a>
          </li>
        </ul>
      </StyledNavBar>
    );
  }
}

export default Navbar;
