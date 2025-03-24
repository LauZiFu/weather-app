import "./carousel.css";
import { addChildren } from "../../styles/dom-util";
import nextImg from "/src/assets/svg/carousel/arrow-next.svg";
import prevImg from "/src/assets/svg/carousel/arrow-back.svg";

/**
 *
 * @param {HTMLElement} slideShow
 */
const initSlideShow = function initSlideShow(slideShow) {
    let slideIndex = 0;

    const showSlides = function showSlides(n, slides) {
        slideIndex = n > slides.length - 1 ? 0 : n;
        slideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
        slides[slideIndex].style.display = "block";
        slides.toSpliced(slideIndex, 1).forEach((element) => {
            element.style.display = "none";
        });
    };

    const plusSlide = function plusSlide(n, slides) {
        slideIndex += n;
        showSlides(slideIndex, slides);
    };

    const currSlide = function currSlide(n, slides) {
        slideIndex = n;
        showSlides(slideIndex, slides);
    };

    const slides = [...slideShow.querySelectorAll(`.my-slides`)];
    currSlide(0, slides);

    const autoNext = function autoNext() {
        return setInterval(() => {
            plusSlide(1, slides);
            controlArrows(0);
        }, 5000);
    };

    let timeout = autoNext();

    const circleDiv = document.createElement("div");
    circleDiv.classList.toggle("circle-container");

    let circle;
    slides.forEach((_, index) => {
        circle = document.createElement("button");
        circle.classList.toggle("circle-btn");
        if (index === 0) circle.classList.toggle("active");
        circle.addEventListener("click", () => {
            clearTimeout(timeout);
            currSlide(index, slides);
            timeout = autoNext(slides);

            circleArr[slideIndex].classList.add("active");
            circleArr.toSpliced(slideIndex, 1).forEach((circle) => {
                circle.classList.remove("active");
            });
        });
        circleDiv.appendChild(circle);
    });

    const circleArr = [...circleDiv.children];

    const nextBtn = slideShow.querySelector(`.next`);
    nextBtn.addEventListener("click", () => {
        controlArrows(1);
    });

    const backBtn = slideShow.querySelector(`.prev`);
    backBtn.addEventListener("click", () => {
        controlArrows(-1);
    });

    const controlArrows = function controlArrows(n) {
        clearTimeout(timeout);
        plusSlide(n, slides);
        timeout = autoNext(slides);
        circleArr[slideIndex].classList.add("active");
        circleArr.toSpliced(slideIndex, 1).forEach((circle) => {
            circle.classList.remove("active");
        });
    };
    slideShow.appendChild(circleDiv);
};

/**
 *
 * @param {Array.<{src: string, caption: string, callback: Function}>} param0
 * @returns
 */
const createSlide = function createSlide(
    { src, caption = "", callback = undefined },
    style = "",
) {
    const slideDiv = document.createElement("div");
    slideDiv.classList.toggle("my-slides");
    if (style) slideDiv.classList.toggle(style);

    const image = document.createElement("img");
    image.classList.toggle("slide");
    image.src = src;
    if (callback) image.addEventListener("click", (event) => callback(event));

    const captionText = document.createElement("div");
    captionText.classList.toggle("caption");
    captionText.textContent = caption;

    addChildren(slideDiv, [image, captionText]);
    return slideDiv;
};

/**
 *
 * @param {string} id
 * @param {Array.<{src: string, caption: string, callback: Function}>} imgCaptionList
 * @param {string} style
 * @returns
 */
const createCarousel = function createCarouselid(
    id,
    imgCaptionList = [],
    style = "",
) {
    const slideContaiDiv = document.createElement("div");
    slideContaiDiv.id = id;
    slideContaiDiv.classList.toggle("slideshow-container");
    if (style) slideContaiDiv.classList.toggle(style);

    const imgList = Array.from(imgCaptionList, (elem) => {
        return createSlide(elem, style);
    });

    const slideShowDiv = document.createElement("div");
    slideShowDiv.classList.toggle("slideshow");
    addChildren(slideShowDiv, imgList);

    // Next button
    const nextBtn = document.createElement("button");
    const nextSvg = document.createElement("img");
    nextBtn.classList.toggle("next");
    nextSvg.src = nextImg;
    nextBtn.appendChild(nextSvg);

    // Prev button
    const prevBtn = document.createElement("button");
    const prevSvg = document.createElement("img");
    prevBtn.classList.toggle("prev");
    prevSvg.src = prevImg;
    prevBtn.appendChild(prevSvg);

    // Add all elements to div
    addChildren(slideContaiDiv, [slideShowDiv, prevBtn, nextBtn]);
    return slideContaiDiv;
};

/**
 *
 * @param {HTMLElement} parentNode
 * @param {string} id
 * @param {Array.<{src: string, caption: string, callback: Function}>} imgCaptionList
 * @param {string} style
 * @returns
 */
const renderCarousel = function renderCarousel(
    parent,
    id,
    imgCaptionList = [],
    style = "",
) {
    const carousel = createCarousel(id, imgCaptionList, style);
    parent.appendChild(carousel);
    initSlideShow(carousel);
};

/**
 *
 */
const initSlideShows = function initSlideShows() {
    const slideShows = Array.from(
        document.querySelectorAll(".slideshow-container"),
    );

    slideShows.forEach((slideShow) => {
        initSlideShow(slideShow);
    });
};

export { createCarousel, renderCarousel, initSlideShows, initSlideShow };
