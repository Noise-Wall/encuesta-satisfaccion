import Api from "@/services/API";

function get() {
  return Api().get("/categorias");
}

export default {
  async getCategorias(data) {
    const res = await get()
    data.jsonData = res.data
  },
};
