let items = document.querySelectorAll(".element-item");
let receptores = document.querySelectorAll(".receptores");
let layoutPreview = document.querySelector("#layout-preview");
let body = document.querySelector("body");

items.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    handleDragstart(event);
  });
  
});

// receptores.forEach((receptor) => {
//   receptor.addEventListener("dragenter", (event) => {
//     event.preventDefault();
//   }, false);
//   receptor.addEventListener("dragover", (event) => {
//     event.preventDefault();
//     if (event.target !== event.currentTarget) return;
//     event.target.classList.add("over");
//   }, false);
//   receptor.addEventListener("dragleave", (event) => {
//     event.preventDefault();
//     event.target.classList.remove("over");
//   }, false);
//   receptor.addEventListener(
//     "drop",
//     (e) => {
//       handleDrop(e);
//     }, false);
//   });
  layoutPreview.addEventListener("dragenter", (event) => {
    event.preventDefault();
  }, false);
  layoutPreview.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;
    event.target.classList.add("over");
  }, false);
  layoutPreview.addEventListener("dragleave", (event) => {
    event.preventDefault();
    event.target.classList.remove("over");
  }, false);
  layoutPreview.addEventListener(
    "drop",
    (e) => {
      handleDrop(e);
    }, false);

function handleDragstart(event) {
  event.dataTransfer.setData("text/html", event.target.dataset.elemento);
  event.currentTarget.style = {"cursor":"move"}
}

function handleDrop(event) {
  // if (event.target !== event.currentTarget) return;
  event.preventDefault();
  let elementoSoltado = event.dataTransfer.getData("text/html")

  let elemento = document.createElement(elementoSoltado)
  if(elementoSoltado === "a"){
    elemento.setAttribute("href","#")
    elemento.innerText = "Link"
  } 
  if(elementoSoltado === "p"){
    elemento.setAttribute("contenteditable","true")
    elemento.innerText = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In illum nihil tempora doloribus ipsam suscipit?"
  } 
  elemento.classList.add(`inner-${elementoSoltado}`)
  // elemento.innerText = elementoSoltado

  event.target.appendChild(elemento)


  // if(document.getElementById(`${elemento.id}__agregado`)){
  //   // toast("Ya existe ese producto", "bottom-left")
  //   // toast("Ya existe ese producto", "bottom-right")
  //   // toast("Ya existe ese producto", "top-left")
  //   toast("Ya existe ese producto", "top-right")
  // }else{
  //   let nuevoElemento = elemento.cloneNode(true)
  //   nuevoElemento.id += "__agregado"
  //   layoutPreview.appendChild(nuevoElemento);
  // }
  event.target.classList.remove("over");
}


function toast(text = "Esto es un toast", position = "top-right", seconds = 1.5) {
  let toast = document.createElement("div")
  toast.classList = `toast visible ${position}`
  toast.innerText = text
  toast.addEventListener("transitionend", () => { body.removeChild(toast) })
  body.appendChild(toast)
  setTimeout(() => {
    toast.classList.remove("visible")
  }, seconds * 1000);
}