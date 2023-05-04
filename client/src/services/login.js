import token from "./token";
import API from "./API";

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
    .catch((err) => {
      return {
        status: err.response.status || 400,
        message: err.response.statusText || err.message,
        data: err.response.data,
      };
    });
}

async function logout() {
  return API()
    .post("/usuarios/logout")
    .catch((err) => {
      return {
        status: err.response.status || 400,
        message: err.response.statusText || err.message,
        data: err.response.data,
      };
    });
}

async function check(object) {
  return API()
    .post("/usuarios/check", object)
    .catch((err) => {
      return {
        status: err.response.status || 400,
        message: err.response.statusText || err.message,
        data: err.response.data,
      };
    });
}

function validate() {
  return API()
    .post("/usuarios/validate")
    .catch((err) => {
      return {
        status: err.response.status || 400,
        message: err.response.statusText || err.message,
        data: err.response.data,
      };
    });
}

export default {
  login,
  logout,
  check,
  validateRoute,
};
