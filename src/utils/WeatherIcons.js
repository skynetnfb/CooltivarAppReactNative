export const WEATHER_ICON = {
    '01d': require('../../imgs/open_weather_01d_2x.png'),
    '01n': require('../../imgs/open_weather_01n_2x.png'),
    '02d': require('../../imgs/open_weather_02d_2x.png'),
    '02n': require('../../imgs/open_weather_02n_2x.png'),
    '03d': require('../../imgs/open_weather_03d_2x.png'),
    '04d': require('../../imgs/open_weather_04d_2x.png'),
    '09d': require('../../imgs/open_weather_09d_2x.png'),
    '10d': require('../../imgs/open_weather_10d_2x.png'),
    '10n': require('../../imgs/open_weather_10n_2x.png'),
    '11d': require('../../imgs/open_weather_11d_2x.png'),
    '13d': require('../../imgs/open_weather_13d_2x.png'),
    '50d': require('../../imgs/open_weather_50d_2x.png'),
    'NO_WEATHER': require('../../imgs/no_weather.png'),
    'INVALID_CODE': require('../../imgs/weather_error.png'),

    get: function (code) {
        switch(code) {
            default:
                return !!code ? WEATHER_ICON['INVALID_CODE'] : WEATHER_ICON['NO_WEATHER'];
            case '01d':
            case '01n':
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
            case '09d':
            case '09n':
            case '10d':
            case '10n':
            case '11d':
            case '11n':
            case '13d':
            case '13n':
            case '50d':
            case '50n': return WEATHER_ICON[code];
        }
    }
};

// icon aliases for different codes rendered with the same image.
WEATHER_ICON['03n'] = WEATHER_ICON['03d'];
WEATHER_ICON['04n'] = WEATHER_ICON['04d'];
WEATHER_ICON['09n'] = WEATHER_ICON['09d'];
WEATHER_ICON['11n'] = WEATHER_ICON['11d'];
WEATHER_ICON['13n'] = WEATHER_ICON['13d'];
WEATHER_ICON['50n'] = WEATHER_ICON['50d'];
