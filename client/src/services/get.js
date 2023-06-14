import Api from "@/services/API";
import fileDownload from "js-file-download"

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

function download(string, contentType) {
  return Api()
    .get(string, {
      responseType: "blob",
      headers: {
        'Content-Type': contentType,
      }
    })
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
  async getPDF(string, filename) {
    try {
      let res = await download(string, 'application/pdf')
      .then((result) => fileDownload(result.data, filename));
      return res;
    } catch (e) {
      console.log(`Get method ERROR: ${e.message} `);
    }
  },
  async getXLSX(string, filename) {
    try {
      let res = await download(string, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .then((result) => {console.log(result); fileDownload(result.data, filename)});
      return res;
    } catch (e) {
      console.log(`Get method ERROR: ${e.message} `);
    }
  },
};
