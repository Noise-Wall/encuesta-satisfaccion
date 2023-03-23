import Api from "./API.js";

function update(string, object) {
  return Api().patch(string, object, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export default {
  async updateTabla(string, object, data) {
    const res = await update(string, object);
    data.data = res.data
  },
};
