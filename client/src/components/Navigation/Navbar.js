import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { StyledNavBar } from "./_NavbarStyle";
import AuthModal from "./modals/Auth";

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
        <AuthModal
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
          {!this.props.userId ? (
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
          ) : (
            <li>
              <a
                href="/#"
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                style={{ color: "red" }}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </StyledNavBar>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps)(Navbar);
