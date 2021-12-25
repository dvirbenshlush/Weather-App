import axios from "axios";
import config from "../asset/config.js";

export const weatherService = {
    searchCityByKey,
    searchCityAutoComplete,
    Forecasts
}

async function searchCityByKey(cityKey) {
    try {
        let response = await axios.get(`${config.URL_Weather}/currentconditions/v1/${cityKey}?apikey=${config.AccuWeather_API_Key}`)
        return response.data
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg)
    }
}

async function searchCityAutoComplete(searchTerm) {
    try {
        let response = await axios.get(`${config.URL_Weather}/locations/v1/cities/autocomplete?apikey=${config.AccuWeather_API_Key}&q=${searchTerm}`)
        return response.data
    } catch (err) {
        const msg = (err.message);
        Promise.reject(msg)

    }
}

async function Forecasts(cityKey) {
    try {
        let response = await axios.get(`${config.URL_Weather}/forecasts/v1/daily/5day/${cityKey}?apikey=${config.AccuWeather_API_Key}`)
        return response.data
    } catch (err) {
        const msg = (err.message);
        Promise.reject(msg)

    }
}


