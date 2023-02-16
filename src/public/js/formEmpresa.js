const results = document.getElementById("empresasResultInput");
const formUsuario = document.getElementById("formUsuario");
const formUsuarioArray = formUsuario.getElementsByTagName("input");
const btnSubmit = document.getElementById("btnSubmit");

let formAction = formUsuario.parentElement.action.split("/");
formAction.splice(0, 3);
formAction = formAction.join("/");

// vaciar valores del formulario
results.value = "";
Array.from(formUsuarioArray).forEach((element) => (element.value = ""));

// evento para autocompletar el formulario de usuario, y cambiar la accion y metodo del formulario de INSERT a SELECT
results.addEventListener("change", (e) => {
  e.preventDefault();
  // obtencion de los elementos options del datalist y ponerlos en un array

  const options = Array.from(
    document.getElementById("empresasResult").getElementsByTagName("option")
  )
    // filtrado de la opcion seleccionada y obtencion de sus datos
    .filter((element) => element.value == results.value);

  if (options.length > 0) {
    const selectedItem = Array.from(options[0].getElementsByTagName("input"));
    const datos = {
      idEmpresa: selectedItem[0].value,
      nombreEmpresa: selectedItem[1].value,
      correo: selectedItem[2].value,
      nombreContacto: selectedItem[3].value,
    };

    // creacion y anexo de valor id
    const id = document.createElement("input");
    id.type = "hidden";
    id.value = datos.idEmpresa;
    formUsuario.appendChild(id);

    formUsuarioArray[0].value = datos.nombreEmpresa;
    formUsuarioArray[1].value = datos.correo;
    formUsuarioArray[2].value = datos.nombreContacto;

    Array.from(formUsuarioArray).forEach(
      (element) => (element.disabled = true)
    );

    // cambiar el metodo y la accion si se llena el formulario mediante datalist
    formUsuario.parentElement.action = "/test";
    formUsuario.parentElement.method = "get";
  } else {
    results.value = "";
    Array.from(formUsuarioArray).forEach((element) => (element.value = ""));

    formUsuario.parentElement.action = `/${formAction}/`;
    formUsuario.parentElement.method = "post";
  }
});
