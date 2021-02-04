import axios, {AxiosResponse} from 'axios';
import {E_OPENWEATHER_GET_FORECAST, E_OPENWEATHER_GET_TODAY} from '../redux/action/action_enum/MeteoActionEnum';


// ------------------------------------------------------------------ private declarations
export class AxiosResponseType{
}

const corsPrefix = '';
const API_KEY = "7368b1dcdbc2b20401886a17908ac573";

export const URL_WeatherToday = (coord) => corsPrefix + "https://api.openweathermap.org/data/2.5/find?" +
    "lat=" + coord.latitude + "&lon=" + coord.longitude + "&units=metric&cnt=1&appid=" + API_KEY;
export const URL_WeatherForecast = (coord, days: number) => corsPrefix + "https://api.openweathermap.org/data/2.5/forecast?"+
    "lat=" + coord.latitude + "&lon=" + coord.longitude + "&units=metric&cnt=" + (days*(24/3)) + "&appid=" + API_KEY;

// art = AxiosResponseType (input type)
function doRequest(url, callbackSuccess: (response: AxiosResponse<AxiosResponseType>) => any, callbackError: (error: any) => any): Promise<AxiosResponse<AxiosResponseType>> {
    console.log('meteo api private doRequest', url);
    return axios
        .get(url)
        .then(callbackSuccess)
        .catch(callbackError);
}

function citySuccessCallback(response: AxiosResponse<ART>, callback: (city: string) => void): void {
    console.log('meteo success city response', response);
    const city = response.data.list[0].name;
    callback(city);
    // setta i dati dentro field, e le coltivazioni se lo prendono da field
}

// ------------------------------------------------------------------ public declarations

export function weatherForecast(coord, days: number, successCallback: (response: AxiosResponse<AxiosResponseType>) => void, failureCallback: (error: any) => void): void {
    console.log("__meteo api FORECAST_REQUEST", coord, days);
    doRequest(URL_WeatherForecast(coord, days), successCallback, failureCallback);
}

export function weatherToday2(params): Promise<AxiosResponse<AxiosResponseType>> {
    console.log('meteo api today req params ',params);
    return doRequest(URL_WeatherToday(params.coord), params.successCallback, params.failureCallback);
}

export function weatherToday(coord, successCallback: (response: AxiosResponse<AxiosResponseType>) => void, failureCallback: (error: any) => void): Promise<AxiosResponse<AxiosResponseType>> {
    console.log('meteo api today req');
    return doRequest(URL_WeatherToday(coord), successCallback, failureCallback);
}

export function findCity(coord, successCallback: (response: AxiosResponse<AxiosResponseType>) => void, failureCallback: (error: any) => void): Promise<AxiosResponse<AxiosResponseType>> {
    console.log('meteo api city req');
    return doRequest(URL_WeatherToday(coord), (response: AxiosResponse<AxiosResponseType>) => { citySuccessCallback(response, successCallback); }, failureCallback);
}

export const API_CALLS = {
    forecast: weatherForecast,
    today: weatherToday,
    city: findCity,
}

