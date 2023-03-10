import Api from "@/services/API";

function get() {
  return Api().get("/respuestas");
}

export default {
  async getRespuestas(data) {
    const res = await get()
    data.jsonData = Array.from(res.data.Respuesta)
  },
};
