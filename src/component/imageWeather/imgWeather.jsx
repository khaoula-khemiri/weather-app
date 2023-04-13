import React from 'react';
import sun from "../../image/sun.png";
import cloud from "../../image/cloud.png";
import rain from "../../image/rain.png";
import snow from "../../image/snow.png";
const ImgWeather = ({ desc }) => {
    let content;
    switch (desc) {
        case 'Clear':
            content = <img src={sun} />;
            break;
        case 'Clouds':
            content = <img src={cloud} />;
            break;
        case 'Rain':
            content = <img src={rain} />;
            break;
        case 'Snow':
            content = <img src={snow} />;
            break;
        default:
            content = <img src={sun} />;
            break;
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default ImgWeather;
