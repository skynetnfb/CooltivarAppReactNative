import axios, {AxiosResponse} from 'axios';
import {FieldSelector} from '../../selector/field';
import {E_DELETE_FIELD_REQ} from '../enum/field';
import {API_CALLS, AxiosResponseType, weatherToday2} from '../../../api/api';
import {E_OPENWEATHER_GET_FORECAST, E_OPENWEATHER_GET_TODAY, METEO_ENUM} from '../enum/MeteoActionEnum';


function forecastSuccessCallback(response: AxiosResponse<ART>, dispatch, fieldid: string): void {
    console.log('meteo success forecast response', response);
    dispatch({type: E_OPENWEATHER_GET_FORECAST, id: fieldid});
    // setta i dati dentro field, e le coltivazioni se lo prendono da field
}

function todaySuccessCallback(response: AxiosResponse<ART>, dispatch, fieldid: string): void {
    console.log('meteo success today response', response);
    const city = response.data.list[0].name;
    const meteo = response.data.list[0].weather[0].icon
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

export const METEO_FORECAST_REQUEST = (dispatch) => (coord, days: number, fieldid: string): void => {
    API_CALLS.forecast<AxiosResponseType>(coord, days,
        (response: AxiosResponse<AxiosResponseType>) => forecastSuccessCallback(response, dispatch, fieldid),
        forecastFailureCallback);
};

export const METEO_TODAY_REQUEST = (dispatch) => (coord, fieldid: string): void => {
    console.log('meteo today req', API_CALLS.today);
    const promise = //weatherToday2( {coord: coord, successCallback: todaySuccessCallback, failureCallback: todayFailureCallback});
        API_CALLS.today(
        coord,
        (response: AxiosResponse<AxiosResponseType>) => todaySuccessCallback(response, dispatch, fieldid),
        todayFailureCallback);
    console.log('meteo today req end', promise);
};
