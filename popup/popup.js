let iframe = document.createElement("iframe");
let url = "https://leetclub-1-o4163817.deta.app/";

iframe.src = url;

let container = document.querySelector(".container");
container.innerHTML = "";

container.appendChild(iframe);