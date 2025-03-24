import "./button.css";
import { addChildren } from "../../styles/dom-util";

export const createButton = (
    { textContent = "", style = "", id = "" },
    callback = undefined,
) => {
    const btn = document.createElement("button");

    if (style) btn.classList.toggle(style);
    if (id) btn.id = id;
    if (textContent) btn.textContent = textContent;
    if (callback) btn.addEventListener("click", (event) => callback(event));

    return btn;
};

export const createLogoButton = (
    { textContent = "", id = "" },
    logo,
    callback = undefined,
) => {
    const btn = document.createElement("button");
    const name = document.createElement("span");
    const logoSvg = document.createElement("img");

    btn.classList.toggle("svg-btn");
    if (id) btn.id = id;
    if (textContent) name.textContent = textContent;
    if (callback) btn.addEventListener("click", (event) => callback(event));

    logoSvg.src = logo;
    addChildren(btn, [name, logoSvg]);
    return btn;
};
