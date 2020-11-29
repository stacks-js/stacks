export function render(block) {
    let body = block.body().get();
    document.body.appendChild(body);
    window.onresize = () => {
        body.style.height = window.innerHeight.toString() + "px";
    };
}
