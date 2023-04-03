import Api from "./API.js";

function insert(string, object) {
  return Api()
    .post(string, object, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .catch(function errorCatch(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
}

export default {
  async insertTabla(string, object, data) {
    const res = await insert(string, object);
    data.data = res.data;
  },
};
