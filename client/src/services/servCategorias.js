import Api from "@/services/API";

export default {
  getCategorias() {
    return Api().get("/categorias");
  },
};
