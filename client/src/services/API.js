import axios from "axios";

export default () => {
  try {
    return axios.create({
      baseURL: "http://localhost:7070",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error)
    return error
  }
};
