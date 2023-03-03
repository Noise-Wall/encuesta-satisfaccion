import Api from "@/services/API";

export default {
  getPreguntas() {
    return Api().get("/preguntas");
  },
};
