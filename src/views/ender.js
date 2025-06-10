export default function enderFunc(document, presenter) {
    const overlay = document.querySelector(".overlay");
    const close = document.querySelector(".close");
    const btnInstall = document.querySelector(".install");

    close.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);

    function onGameEnd() {
        const message = presenter.endMessage();
        const h2 = overlay.querySelector("h2");
        h2.textContent = message;
        const content = overlay.querySelector(".content");
        content.textContent = "Determinant =  " + presenter.getResult();
        overlay.classList.add("show");
        btnInstall.classList.remove("hidden2");
    }
    return {
        onGameEnd
    };
}
