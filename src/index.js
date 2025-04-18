import { getWeatherData } from "./weather-data";
import "./styles.css";

const searchForm = document.querySelector("#search-bar");
const searchBar = document.querySelector("#search-location");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    getWeatherData(searchBar.value).then((response) => {
        console.log(response);
    });
});
