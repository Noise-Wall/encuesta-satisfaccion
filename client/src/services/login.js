import token from "./token";
import API from "./API"

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

function login(object) {
  return API()
    .post("/usuarios/login", object, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    })
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

async function logout() {
  return API()
    .post("/usuarios/logout")
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

function validate() {
  return API()
    .post("/usuarios/validate")
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

export default {
  login,
  logout,
  validateRoute,
};
