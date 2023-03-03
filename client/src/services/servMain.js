import Api from "@/services/API";

export default {
  getAll() {
    return Api().get("/");
  },
};
