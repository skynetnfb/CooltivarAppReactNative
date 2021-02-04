import axios, {AxiosResponse} from 'axios';
import {API_CALLS, AxiosResponseType, URL_WeatherForecast, URL_WeatherToday} from '../../../api/api';
import {E_OPENWEATHER_GET_FORECAST, E_OPENWEATHER_GET_TODAY, METEO_ENUM} from '../action_enum';


function forecastSuccessCallback(response: AxiosResponse<ART>, dispatch, fieldid: string): void {
    console.log('meteo success forecast response', response);
    const fullForecast = response.data.list;
    // sono a distanza di 3 ore, ne prendi uno ogni 8 = uno ogni giorno.
    let filterForecast = fullForecast.filter((elem, index)=> index % 8 === 0);
    console.log('meteo success forecast filter 1', JSON.parse(JSON.stringify(filterForecast)));
    filterForecast = filterForecast.map((e) => e.weather[0].icon);
    console.log('meteo success forecast filter 2', filterForecast);
    dispatch({type: E_OPENWEATHER_GET_FORECAST, id: fieldid, icons: filterForecast});
    // setta i dati dentro field, e le coltivazioni se lo prendono da field
}

function todaySuccessCallback(response: AxiosResponse<ART>, dispatch, fieldid: string): void {
    console.log('meteo success today response', response);
    const city = response.data.list[0].name;
    const meteo = response.data.list[0].weather[0].icon;
    console.log('meteo success today response', response.data.list[0], city, meteo);
    dispatch({type: E_OPENWEATHER_GET_TODAY, id: fieldid, icon: meteo});
    // setta i dati dentro field, e le coltivazioni se lo prendono da field
}

function todayFailureCallback(error: any): void {
    console.log('meteo failure today response', error);
}

function forecastFailureCallback(error: any): void {

    console.log('meteo failure forecast response', error);
}

export const METEO_FORECAST_REQUEST = (dispatch) => (coord, fieldid: string, days: number = 3): void => {
    console.log("__meteo METEO_FORECAST_REQUEST", coord, fieldid, days);
    METEO_TODAY_REQUEST(dispatch)(coord, fieldid);
    API_CALLS.forecast(coord, days,
        (response: AxiosResponse<AxiosResponseType>) => forecastSuccessCallback(response, dispatch, fieldid),
        forecastFailureCallback);
};

// NB: anche questa versione è "thunk-like" senza usare thunk middleware, l'azione viene lanciata solo in caso di successo, ask prof se sono equivalenti in qualità
export const METEO_TODAY_REQUEST = (dispatch) => (coord, fieldid: string): void => {
    console.log('meteo today req', API_CALLS.today);
    const promise = //weatherToday2( {coord: coord, successCallback: todaySuccessCallback, failureCallback: todayFailureCallback});
        API_CALLS.today(
        coord,
        (response: AxiosResponse<AxiosResponseType>) => todaySuccessCallback(response, dispatch, fieldid),
        todayFailureCallback);
    console.log('meteo today req end', promise);
};


export const THUNKED_WEATHER_TODAY = (coordinate, fieldid) =>
    (dispatch, getState) => {
        axios.get(  URL_WeatherToday(coordinate) )
            .then( (response: any): string => "" + response.data.list[0].weather[0].icon)
            .then( (icon: string) => dispatch({type: E_OPENWEATHER_GET_TODAY, id: fieldid, icon: icon}))
            .catch( (err) => {
                console.warn("failed to get weather", err);
            });
    };

export const THUNKED_WEATHER_TODAY_MAPPEDTOSTATE = (dispatch) => (coordinate, fieldid) => {
    dispatch(
        (dispatch, getState) => {
            axios.get(  URL_WeatherToday(coordinate) )
                .then( (response: any): string => "" + response.data.list[0].weather[0].icon)
                .then( (icon: string) => dispatch({type: E_OPENWEATHER_GET_TODAY, id: fieldid, icon: icon}))
                .catch( (err) => {
                    console.warn("failed to get weather", err);
                });
        });
};

export const THUNKED_WEATHER_FORECAST_MAPPEDTOSTATE = (dispatch) => (coordinate, fieldid, days: number = 3) => {
    dispatch(
        (dispatch, getState) => {
            console.log('__meteo cd forecast dispatched',getState);

            axios.get(  URL_WeatherForecast(coordinate, days) )
                .then( (response: any): string[] => {
                    const fullForecast = response.data.list;
                    // sono a distanza di 3 ore, ne prendi uno ogni 8 = uno ogni giorno.
                    let filterForecast = fullForecast.filter((elem, index)=> index % 8 === 0);
                    // console.log('meteo success forecast filter 1', JSON.parse(JSON.stringify(filterForecast)));
                    filterForecast = filterForecast.map((e) => e.weather[0].icon);
                    return filterForecast; })
                .then( (icons: string[]) => dispatch({type: E_OPENWEATHER_GET_FORECAST, id: fieldid, icons: icons}))
                .catch( (err) => {
                    console.warn("failed to get weather", err);
                });
            axios.get(  URL_WeatherToday(coordinate) )
                .then( (response: any): string => "" + response.data.list[0].weather[0].icon)
                .then( (icon: string) => dispatch({type: E_OPENWEATHER_GET_TODAY, id: fieldid, icon: icon}))
                .catch( (err) => {
                    console.warn("failed to get weather", err);
                });
        });

};
