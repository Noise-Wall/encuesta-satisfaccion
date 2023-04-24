import Api from "@/services/API";

function deleteFunc(string) {
  return Api()
    .delete(string)
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
  async deleteTabla(string) {
    const res = await deleteFunc(string);
    return res.data;
  },
};
