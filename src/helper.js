"use strict";
export function getTemplateByName(name) {
    return document.querySelector(name);
}

export function hide(selector) {
    const el = document.querySelector(selector);
    hideElem(el);
}

export function hideElem(el) {
    if (el) {
        el.classList.add('hidden');
    }
}

export function removeElem(el) {
    if (el) {
        el.remove();
    }
}

export function defer() {
    let res, rej;

    const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });

    promise.resolve = res;
    promise.reject = rej;

    return promise;
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const iconChanger = function () {
    const canvas = document.createElement('canvas');
    const link = document.getElementById('favicon');
    if (!link) {
        console.error("Can't find favicon");
    }
    canvas.height = canvas.width = 16; // set the size
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';

    const changeBage = function (num) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(num, 2, 12);
        if (!link) {
            console.log("Can't find favicon");
            return;
        }
        link.href = canvas.toDataURL('image/png');
    };
    return {changeBage: changeBage}
}();


export function log(msg) {
    let p = document.getElementById('log');
    if (!p) {
        p = document.body.appendChild(document.createElement('div'));
        p.setAttribute("id", "log");
    }
    p.innerHTML = msg + "\n" + p.innerHTML;
    console.log(msg);
}

function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

export function parseSettings(window, document, settings) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
    }
}
