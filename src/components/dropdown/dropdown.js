export const initDropDown = function initDropDown(dropDownCont) {
    const openButton = dropDownCont.querySelector(".dropdown-btn");
    const dropDown = dropDownCont.querySelector(".dropdown");

    openButton.addEventListener("click", () => {
        dropDown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (e.target !== openButton) {
            setTimeout(() => dropDown.classList.remove("active"), 10);
        }
    });
};

export const initDropDowns = function initDropDowns() {
    const dropDownButtons = [
        ...document.querySelectorAll(".dropdown-container"),
    ];
    dropDownButtons.forEach((dropDown) => initDropDown(dropDown));
};
