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
      registerOpen: false,
      loginData: {
        username: "",
        password: ""
      },
      registerData: {
        username: "",
        password: "",
        passwordConf: ""
      }
    };
  }

  loginChange = e => {
    this.setState({
      ...this.state,
      loginData: { ...this.state.loginData, [e.target.name]: e.target.value }
    });
  };

  registerChange = e => {
    this.setState({
      ...this.state,
      registerData: {
        ...this.state.registerData,
        [e.target.name]: e.target.value
      }
    });
  };

  submitLogin = e => {
    e.preventDefault();

  };

  render() {
    const { modalOpen, afterOpenModal, closeModal } = this.props;
    const { loginOpen, registerOpen, loginData, registerData } = this.state;
    const LoginDisplay = (
      <div className="login">
        <form method="POST" onSubmit={e => this.submitLogin(e)}>
          <h3>Login</h3>
          <div>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={this.loginChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={this.loginChange}
              placeholder="Password"
            />
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
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={this.registerChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <input
              type="password"
              name="passwordConf"
              value={registerData.password}
              onChange={this.registerChange}
              placeholder="Password Confirm"
            />
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
