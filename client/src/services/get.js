import Api from "@/services/API";

function get(string) {
  return Api().get(string);
}

export default {
  async getAll(data) {
    const res = await get("/")
    data.data = Array.from(res.data)
  },
  async getEmpresas(data) {
    const res = await get("/empresas")
    data.data = Array.from(res.data.Empresa)
  },
  async getCategorias(data) {
    const res = await get("/categorias")
    data.data = Array.from(res.data.Categoria)
  },
  async getPreguntas(data) {
    const res = await get("/preguntas")
    data.data = Array.from(res.data.Pregunta)
  },
  async getEncuestas(data) {
    const res = await get("/encuestas")
    data.data = Array.from(res.data.Encuesta)
  },
  async getRespuestas(data) {
    const res = await get("/respuestas")
    data.data= Array.from(res.data.Respuesta)
  },
  async getResultados(data) {
    const res = await get("/resultados")
    data.data= Array.from(res.data.Resultado)
  },
};
