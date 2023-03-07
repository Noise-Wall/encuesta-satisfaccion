import Api from "@/services/API";

function get() {
  return Api().get("/resultados");
}

export default {
  async getResultados(data) {
    const res = await get()
    data.jsonData = res.data
  },
};
