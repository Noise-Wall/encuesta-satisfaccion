import Api from "@/services/API";

export default {
  getEmpresas() {
    return Api().get("/empresas");
  },
};
