export function getRGBColor(value, min, max) {
    let normalized = (value - min) / (max - min);
    normalized = Math.max(0, Math.min(1, normalized));

    let r = Math.round(255 * (1 - normalized));
    let g = Math.round(255 * normalized);

    return `rgb(${r}, ${g}, 0)`;
}

export function addChildren(elem, childList) {
    childList.forEach((child) => elem.appendChild(child));
}

/**
 *
 * @param {Node} elem
 * @param {Array.<string>} attributes
 * @param {string} value
 */
export function setAttributes(elem, attributes, value) {
    attributes.forEach((attribute) => elem.setAttribute(attribute, value));
}

/**
 *
 * @param {Array.<Node>} nodeList
 * @param {string} attribute
 * @param {*} value
 */
export function setAttributeNodes(nodeList, attribute, value) {
    nodeList.forEach((node) => node.setAttribute(attribute, value));
}
