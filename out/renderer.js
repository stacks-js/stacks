export function render(block) {
    let body = block.body();
    document.querySelector("body").innerHTML += body.html;
}
