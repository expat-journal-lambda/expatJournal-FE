import React, { Component } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
    transform: "translate(-50%, -50%)"
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOpen: true,
      registerOpen: false
    };
  }

  render() {
    const { modalOpen, afterOpenModal, closeModal } = this.props;
    const { loginOpen, registerOpen } = this.state;
    const LoginDisplay = (
      <div className="login">
        <form>
          <h3>Login</h3>
          <div>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
    const RegisterDisplay = (
      <div className="register">
        <form>
          <h3>Register</h3>
          <div>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );

    return (
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <header>
          <span
            onClick={() =>
              this.setState({ loginOpen: false, registerOpen: true })
            }
          >
            Register
          </span>
          &nbsp;
          <span
            onClick={() =>
              this.setState({ registerOpen: false, loginOpen: true })
            }
          >
            Login
          </span>
        </header>
        {loginOpen && LoginDisplay}
        {registerOpen && RegisterDisplay}
      </Modal>
    );
  }
}
