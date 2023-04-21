import axios from "axios";
import token from "./token"

export default () => {
  try {
    const bearer=token.getToken(token);
    return axios.create({
      baseURL: "http://localhost:7070",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
