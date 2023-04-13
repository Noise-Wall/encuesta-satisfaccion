import Api from "@/services/API";

function get(string) {
  return Api()
    .get(string)
    .catch(function errorCatch(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
}

export default {
  async getAll(data) {
    try {
      const res = await get("/");
      data.data = Array.from(res.data);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getEmpresas(data) {
    try {
      const res = await get("/empresas");
      data.data = Array.from(res.data.Empresa);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getCategorias(data) {
    try {
      const res = await get("/categorias");
      data.data = Array.from(res.data.Categoria);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getPreguntas(data) {
    try {
      const res = await get("/preguntas");
      data.data = Array.from(res.data.Pregunta);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getEncuestas(data) {
    try {
      const res = await get("/encuestas");
      data.data = Array.from(res.data.Encuesta);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getRespuestas(data) {
    try {
      const res = await get("/respuestas");
      data.data = Array.from(res.data.Respuesta);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getPreguntasHabilitadas(data) {
    try {
      const res = await get("/preguntas/enabled");
      data.data = Array.from(res.data.Pregunta);
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getLatest(data, tabla) {
    try {
      const res = await get(`/latest/${tabla}`);
      data.data = res.data[0];
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getEncuestaResults(data, id) {
    try {
      const res = await get(`/respuestas/group/${id}`);
      data.data = res.data.Respuesta
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
  async getEncuestaDatos(data, id) {
    try {
      const res = await get(`/encuestas/datos/${id}`);
      data.data = res.data.Encuesta
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  },
};
