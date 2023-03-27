import Api from "@/services/API";

function deleteFunc(string) {
  return Api().delete(string);
}

export default {
  async deleteTabla(string, data) {
    const res = await deleteFunc(string)
    data.data = Array.from(res.data)
  }
}