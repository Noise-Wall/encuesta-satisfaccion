import axios from "axios";
import token from "./token";

function api() {
  try {
    return axios.create({
      // baseURL: "https://laquin-encuesta-rest.onrender.com/usuarios",
      baseURL: "http://localhost:7070/usuarios",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded",
        Secure: true,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

function validateRoute(route) {
  if (route.fullPath.startsWith("/admin")) {
    if (token.getToken("token") === "") {
      return "/login";
    }
    console.log("token found");
    validate()
      .then(() => {
        console.log("valid token");
        return "/admin";
      })
      .catch(() => {
        return "/login";
      });
  } else if (route.fullPath.startsWith("/login")) {
    if (token.getToken("token") !== "") {
      console.log("token found");
      validate()
        .then(() => {
          console.log("valid token");
          return "/admin";
        })
        .catch(() => {
          return "/login";
        });
    }
    return "/login";
  }
  return route.fullPath;
}

async function login(object) {
  return api()
    .post("/login", object)
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

async function logout() {
  return api()
    .post("/logout")
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

function validate() {
  return api()
    .post("/validate")
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

export default {
  login,
  logout,
  validateRoute,
};
