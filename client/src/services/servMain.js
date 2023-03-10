import Api from "@/services/API";

function get() {
  return Api().get("/");
}

export default {
  async getAll(data) {
    const res = await get()
    data.jsonData = Array.from(res.data)
  },
};
