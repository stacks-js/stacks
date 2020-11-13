const div = document.createElement("div");
const link = document.createElement("a");
link.href = "https://www.google.com";
link.innerText = "hello";
div.appendChild(link);
document.querySelector("body").appendChild(div);
