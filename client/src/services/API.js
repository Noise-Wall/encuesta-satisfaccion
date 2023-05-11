import axios from "axios";

export default () => {
  try {
    return axios.create({
      baseURL: "https://api.laquin.mx",
      // baseURL: "http://localhost:7070",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Secure: true,
        "X-From": "laquin.mx", 
        // "X-From": "localhost"
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
