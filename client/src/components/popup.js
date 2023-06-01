function popup(
  content,
  action = (e) => e.target.parentElement.parentElement.remove(),
  buttonClass = null
) {
  const popupBlur = document.createElement("div");
  popupBlur.classList.add("blur-pantalla");
  const popupPanel = document.createElement("div");
  popupPanel.classList.add("panel");
  const x = document.createElement("div");
  x.classList.add("x");
  x.innerHTML = "x";

  const btn = document.createElement("button");
  btn.classList.add("boton");
  btn.innerHTML = "Aceptar";
  if (buttonClass) btn.classList.add(buttonClass);
  btn.addEventListener("click", action);

  x.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
  });
  popupPanel.appendChild(x);
  popupPanel.insertAdjacentHTML("beforeend", content);
  popupPanel.appendChild(btn);

  popupBlur.appendChild(popupPanel);
  document.body.appendChild(popupBlur);
}

export const createPopup = (content, action, buttonClass) =>
  popup(content, action, buttonClass);
