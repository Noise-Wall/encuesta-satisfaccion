import Api from "@/services/API";

function get() {
  return Api().get("/encuestas");
}

export default {
  async getEncuestas(data) {
    const res = await get()
    data.jsonData = res.data
  },
};
