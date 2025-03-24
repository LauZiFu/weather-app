import { setAttributes, addChildren } from "../../styles/dom-util";

/**
 *
 * @param {*} id
 * @param {Array.<string>} options
 */
export function createFormSelect(id, options = []) {
    const selectContainer = document.createElement("div");
    const label = document.createElement("label");
    const selectElem = document.createElement("select");
    let newOption;

    label.setAttribute("for", id);
    setAttributes(selectElem, ["name", "id"], id);

    // Creates option element for each value string
    options.forEach((value) => {
        newOption = document.createElement("option");
        newOption.value = value;
        newOption.textContent = value;
        selectElem.appendChild(newOption);
    });

    addChildren(selectContainer, [label, selectElem]);
    return selectContainer;
}
