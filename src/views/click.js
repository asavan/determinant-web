export default function handleClick(evt) {
    const getIndex = function (e) {
        const target = e.target || e.srcElement;
        const cand = parseInt(target.dataset.num, 10);
        return cand - 1;
    };

    evt.preventDefault();
    if (!(evt.target.classList.contains("cell") || evt.target.classList.contains("digit"))) {
        return -1;
    }
    if (evt.target.classList.contains("disabled")) {
        return -1;
    }
    return getIndex(evt);
}
