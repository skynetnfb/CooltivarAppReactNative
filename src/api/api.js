import axios from 'axios';

function doRequest(link) {
    return axios
        .get(link)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export const forecast = (coord, days)=> {
    let link =  "https://api.openweathermap.org/data/2.5/forecast?"+
    "lat=" + coord.latitude + "&lon=" + coord.longitude + "&units=metric&cnt=" + (days*(24/3)) + "&appid=7368b1dcdbc2b20401886a17908ac573";
    return doRequest(link);
};

export const getForecastToday = (coord)=>{
    let link = "https://api.openweathermap.org/data/2.5/find?" +
    "lat=" + coord.latitude + "&lon=" + coord.longitude + "&units=metric&cnt=1&appid=7368b1dcdbc2b20401886a17908ac573";
    return doRequest(link);
};


