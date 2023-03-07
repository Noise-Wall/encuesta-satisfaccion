import Api from "@/services/API";

function get() {
  return Api().get("/preguntas");
}

export default {
  async getPreguntas(data) {
    const res = await get()
    data.jsonData = res.data
  },
};
