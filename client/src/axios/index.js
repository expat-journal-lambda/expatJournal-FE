import axios from "axios";

export default function() {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "false";

  const instance = axios.create({
    headers: {
      Authorization: token
    }
  });

  return instance;
}
