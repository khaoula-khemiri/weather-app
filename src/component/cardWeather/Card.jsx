import React from 'react'
import "./card.scss"
import image from "../../image/sun.png";
import Day from '../day/Day';
import ImgWeather from '../imageWeather/imgWeather';

export const Card = ({ day, temp, desc }) => {
    return (
        <div className='card'>
            <div className="day"> <Day date={day} /></div>
            <div className="imgCard" > <ImgWeather desc={desc} /> </div>

            <div className="infoCard">
                <span>{temp}°C</span>
                <span>{desc}</span>

            </div>
        </div>
    )
}
