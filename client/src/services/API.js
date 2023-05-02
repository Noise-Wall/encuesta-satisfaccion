import axios from "axios";

export default () => {
  try {
    return axios.create({
      baseURL: "https://api.techddmr.com.mx",
      // baseURL: "http://localhost:7070",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Secure: true,
        // "X-From": "localhost"
        "X-From": "techddmr.com.mx", 
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
