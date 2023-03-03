import Api from "@/services/API";

export default {
  getRespuestas() {
    return Api().get("/respuestas");
  },
};
