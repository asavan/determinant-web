"use strict";

export function hideElem(el) {
    if (el) {
        el.classList.add("hidden");
    }
}

export function showElem(el) {
    if (el) {
        el.classList.remove("hidden");
    }
}

export function removeElem(el) {
    if (el) {
        el.remove();
    }
}
