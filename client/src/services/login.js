import axios from "axios";
import token from "./token";

function api() {
  try {
    return axios.create({
      baseURL: "http://localhost:7070/usuarios/login",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

function login(object) {
  return api()
    .post("/", object)
    .catch((err) =>
      err.response ? console.log(err.response) : console.log(err.message)
    );
}

export default async (object) => {
  await login(object).then((res) => {
    // res.data.data.token
    // res.data.data.usuario
    console.log(res.data);
    token.setToken("token", res.data.data.Usuario);
    token.setToken("token", res.data.data.token);
  });
};
