import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  loginUser,
  registerUser,
  setErrorMessage
} from "../../../actions/authActions";
import { IoIosClose } from "react-icons/io";
import {
  StyledMessage,
  StyledModalHeader,
  StyledAuthWrapper,
  customStyles
} from "./_StyledAuth";

class Login extends Component {
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
      },
      msg: "",
      msgClass: ""
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

  componentWillReceiveProps(nextProps) {
    console.log("Will mount", nextProps);
    if (nextProps.error) {
      alert(nextProps.error);
    }
    if ((this.state.loginOpen || this.state.registerOpen) && nextProps.userId) {
      this.setState({
        msg: "You are now logged in. Redirecting...",
        msgClass: "alert-success"
      });
      setTimeout(() => {
        this.setState({
          msg: "",
          msgClass: ""
        });
        window.location.reload();
      }, 3000);
    }
  }

  submitLogin = e => {
    e.preventDefault();
    this.props.loginUser(this.state.loginData);
  };

  submitRegister = e => {
    e.preventDefault();
    this.props.setErrorMessage(null);
    const { username, password, passwordConf } = this.state.registerData;
    if (password !== passwordConf) {
      this.setState({
        ...this.state,
        msg: "The two passwords do not match",
        msgClass: "error"
      });
    } else {
      this.props.registerUser({ username, password });

      if (this.props.userId) {
        this.setState({
          ...this.state,
          msg: "You are now logged in. Redirecting...",
          msgClass: "alert-success"
        });
        window.location.reload();
      }
    }
  };

  render() {
    const { modalOpen, afterOpenModal, closeModal } = this.props;
    const { loginOpen, registerOpen, loginData, registerData } = this.state;
    const LoginDisplay = (
      <StyledAuthWrapper>
        <form method="POST" onSubmit={e => this.submitLogin(e)}>
          <h3>Login</h3>
          <div>
            <input
              autoFocus
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
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </StyledAuthWrapper>
    );
    const RegisterDisplay = (
      <StyledAuthWrapper>
        <form method="post" onSubmit={this.submitRegister}>
          <h3>Register</h3>
          <div>
            <input
              autoFocus
              type="text"
              name="username"
              value={registerData.username}
              onChange={this.registerChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={this.registerChange}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="passwordConf"
              value={registerData.passwordConf}
              onChange={this.registerChange}
              placeholder="Password Confirm"
            />
          </div>
          <div>
            <button type="submit" className="register-btn">
              Register
            </button>
          </div>
        </form>
      </StyledAuthWrapper>
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
        <IoIosClose
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
            color: "red",
            fontSize: "2rem",
            cursor: "pointer"
          }}
          onClick={closeModal}
        />
        <StyledModalHeader>
          <span
            onClick={() =>
              this.setState({ registerOpen: false, loginOpen: true })
            }
            className={loginOpen ? "active" : "login-tab inactive"}
          >
            Login
          </span>
          <span
            onClick={() =>
              this.setState({ loginOpen: false, registerOpen: true })
            }
            className={registerOpen ? "active" : "register-tab inactive"}
          >
            Register
          </span>
        </StyledModalHeader>
        {this.state.msg && (
          <StyledMessage className={`alert ${this.state.msgClass}`}>
            {this.state.msg}
          </StyledMessage>
        )}
        {loginOpen && LoginDisplay}
        {registerOpen && RegisterDisplay}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser, setErrorMessage }
)(Login);
