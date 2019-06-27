import styled from "styled-components";

export const StyledMessage = styled.div`
  margin: 1rem auto;
`;

export const StyledModalHeader = styled.header`
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

export const StyledAuthWrapper = styled.div`
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

export const customStyles = {
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
