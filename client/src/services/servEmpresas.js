import Api from "@/services/API";

function get() {
  return Api().get("/empresas");
}

export default {
  async getEmpresas(data) {
    const res = await get()
    data.data = Array.from(res.data.Empresa)
  },
};
