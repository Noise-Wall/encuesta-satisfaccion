import Api from "@/services/API";

export default {
  getResultados() {
    return Api().get("/resultados");
  },
};
