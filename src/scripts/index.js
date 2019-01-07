import '../styles/index.scss';
import { Http } from './http';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data';

const APP_ID = '5be81d424a687824ceacae9e89568d21';

const ELEMENT_SEARCH_BUTTON = document.querySelector('button');
const ELEMENT_SEARCHED_CITY = document.querySelector('#city');

const ELEMENT_LOADING_TEXT = document.querySelector('#load');
const ELEMENT_WEATHER_BOX = document.querySelector('#weather');

const ELEMENT_WEATHER_CITY = ELEMENT_WEATHER_BOX.firstElementChild;
const ELEMENT_WEATHER_DESCRIPTION = document.querySelector('#weatherDescription');
const ELEMENT_WEATHER_TEMPERATURE = ELEMENT_WEATHER_BOX.lastElementChild;

console.log('webpack starterkit');
console.log(ELEMENT_WEATHER_CITY.textContent);
console.log(ELEMENT_WEATHER_DESCRIPTION.textContent);
console.log(ELEMENT_WEATHER_TEMPERATURE.textContent);

ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME = ELEMENT_SEARCHED_CITY.value.trim();

    if (CITY_NAME.length == 0) {
        return alert('Please enter a city name');
    }
    ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENT_WEATHER_BOX.style.display = 'none';

    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID;

    Http.fetchData(URL)
        .then(responseData => {
            //console.log(responseData.weather[0].description.toUpperCase());
            const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;
            updateWeather(WEATHER_PROXY);
        }).catch(error => alert(error));
}

function updateWeather(weatherData) {
    ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    ELEMENT_WEATHER_BOX.style.display = 'block';
    ELEMENT_LOADING_TEXT.style.display = 'none';
}