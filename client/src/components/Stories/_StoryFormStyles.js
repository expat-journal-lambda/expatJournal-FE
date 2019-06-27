import styled from "styled-components";

export const StyledFormWrapper = styled.div`
  background: white;
  width: 80%;
  margin: 1rem auto;
  padding: 4rem 0rem 4rem 0rem;
  border-radius: 5px;
`;

export const StoryImage = styled.div`
  height: 200px;
  width: 200px;

  img {
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;
  border: 2px dashed #d0d0d0;
  border-radius: 5px;
  background: #e0e0e0;

  img {
    width: 100%;
    height: 100%;
  }

  .image-placeholder {
    height: 250px;
    width: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .upload-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      text-align: center;
      color: #444;
    }
  }

  input {
    display: none;
  }
`;

export const StyledForm = styled.form`
  width: 80%;
  margin: 1rem auto;

  input,
  textarea {
    width: 100%;
    font-size: 1.35rem;
    padding: 1rem;
    margin: 0.51rem auto;
    outline: none;
    font-family: "Montserrat", sans-serif;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }
  h2 {
    text-align: center;
  }
  .btn {
    width: 100%;
    font-size: 1.3rem;
    padding: 0.9em;
    border: 1px solid transparent;
    color: white;
    background: #09314d;
    border-radius: 0.3em;

    &:hover {
    }
  }
`;
