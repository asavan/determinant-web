export default function initerFunc(document, fieldSize) {
    function initField(classNames, elem, addCard) {
        for (let i = 0; i < fieldSize; i++) {
            const cell = document.createElement("div");
            for (const className of classNames) {
                cell.classList.add(className);
            }
            const num = i + 1;
            cell.dataset.num = num;
            if (addCard) {
                cell.classList.add("card-"+num);
                cell.textContent = num;
            }
            elem.appendChild(cell);
        }
    }
    return {
        initField
    };
}
