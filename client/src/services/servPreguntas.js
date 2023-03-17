import Api from "@/services/API";

function get() {
  return Api().get("/preguntas");
}

function update(id, data) {
  Api.patch(`/preguntas/${id}`, data);
}

export default {
  async getPreguntas(data) {
    const res = await get()
    data.data = Array.from(res.data.Pregunta)
  },

  async updatePregunta(data, id) {
    const res = await update(id)
  }
};
