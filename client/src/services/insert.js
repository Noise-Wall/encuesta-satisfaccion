import Api from './API.js'

function insert(string, object) {
    return Api().post(string, object, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
  
  export default {
    async insertTabla(string, object, data) {
      const res = await insert(string, object);
      data.data = res.data
    },
  };
  