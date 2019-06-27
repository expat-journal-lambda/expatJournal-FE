import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  loginUser,
  registerUser,
  setErrorMessage
} from "../../../actions/authActions";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

const StyledMessage = styled.div`
  margin: 1rem auto;
`;

const StyledModalHeader = styled.header`
  display: flex;
  padding-top: 2rem;

  span {
    flex-grow: 1;
    text-align: center;
    padding: 1.2rem;

    &.active {
      background: #8ec5ed;
      border-radius: 5px;
      color: white;
    }
    &:hover {
      cursor: pointer;
    }
    &.register-tab {
    }

    &.login-tab {
    }
  }
`;

const StyledAuthWrapper = styled.div`
  form h3 {
    text-align: center;
    margin: 2rem auto;
  }

  form input {
    width: 100%;
    font-size: 1.2rem;
    margin-bottom: 0.5em;
    padding: 0.8em;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    font-family: "Montserrat", sans-serif;
    outline: none;
  }
  form button {
    width: 100%;
    padding: 0.9rem;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid transparent;
    background: #177abf;
    color: white;
    font-family: "Montserrat", sans-serif;
    outline: none;

    &:hover {
      cursor: pointer;
      background: #136198;
    }

    &.register-btn {
      background: #4ea699;
      &:hover {
        background: #3e847a;
      }
    }
  }
`;

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
