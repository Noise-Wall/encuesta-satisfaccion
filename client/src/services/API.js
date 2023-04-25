import axios from "axios";

export default () => {
  try {
    return axios.create({
      baseURL: "https://laquin-encuesta-rest.onrender.com",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
