import Api from "@/services/API";

export default {
  getEncuestas() {
    return Api().get("/encuestas");
  },
};
