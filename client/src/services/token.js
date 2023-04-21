function setToken(name, value) {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getToken(name) {
  let name = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkToken() {
  let token = getToken("token");
  if (user != "") {
    return false;
  }
  return true;
}

export default {
  setToken,
  getToken,
  checkToken,
};
