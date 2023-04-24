import Api from "./API.js";

function update(string, object) {
  return Api()
    .patch(string, object, {
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
  async updateTabla(string, object) {
    const res = await update(string, object);
    return res.data;
  },
};
