import Api from "@/services/API";

function get(string) {
  return Api()
    .get(string)
    .catch((error) => {
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
  async getTabla(string) {
    try {
      let res = await get(string);
      return res.data;
    } catch (e) {
      console.log(`Get method ERROR: ${e.message} `);
    }
  },
};
