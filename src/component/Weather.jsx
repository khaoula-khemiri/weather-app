import React, { useState, useEffect } from 'react';
import image from "../image/sun.png";
import "./weather.scss";
import { Card } from './cardWeather/Card';
import Day from './day/Day';
import ImgWeather from './imageWeather/imgWeather';



// import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

const Weather = () => {
    const [city, setcity] = useState("Tunisia");
    const [inputValue, setInputValue] = useState('');
    const [temperature, settemperature] = useState();
    const [pressure, setpressure] = useState();
    const [humidity, setHumidity] = useState();
    const [description, setdescription] = useState();
    const [descNote, setdescNote] = useState();
    const [date, setdate] = useState();
    const [note, setnote] = useState(false);
    const [list, setlist] = useState([]);
    const api = {
        key: "e368838af091d5fc6ee949badb77048a",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    useEffect(() => {
        searchCity(city)
    }, [])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
            // replace with your desired code
            searchCity(inputValue)
        }
    };


    const searchCity = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api.key}`)
            .then(response => response.json())
            .then(data => {
                // Do something with the data, such as display the temperature for the next 4 days
                if (data.cod == "200") {
                    setnote(false)
                    setcity(city);
                    const forecast = data.list;
                    const info = forecast[0].main
                    let today = new Date(forecast[0].dt_txt).getDay()
                    settemperature(Math.round(info.temp - 273.15))
                    setpressure(info.pressure)
                    setHumidity(info.humidity)
                    setdescription(data.list[0].weather[0].description)
                    setdescNote(data.list[0].weather[0].main)
                    setdate(forecast[0].dt_txt);
                    let i = 1;
                    let j = 0;
                    let a = []
                    while (j <= 6 && forecast[i]) {
                        const date = new Date(forecast[i].dt_txt).getDay()
                        i++
                        if (today != date) {
                            const newInfo = forecast[i].main
                            const array = {
                                "day": forecast[i].dt_txt,
                                "temperature": Math.round(newInfo.temp - 273.15),
                                "desc": forecast[i].weather[0].main
                            }
                            a.push(array)
                            today = date
                            j++
                        }
                    }

                    setlist(a)

                } else {
                    setnote(true)
                }
            })
            .catch(error => console.error(error));
    }

    return (

        <div className='weather'>

            <div className="top">
                <div className="right">
                    <div className="inputContainer">
                        <input placeholder='City or Contry ....'

                            onChange={(event) => setInputValue(event.target.value)}
                            onKeyPress={handleKeyPress} />

                        {note && <div className="inputNote">No city with that name found </div>}
                    </div>
                    <div className="rightInformation">
                        <div className="selectCity">
                            <div className="city">{city}</div>
                            <div className="day"><Day date={date} /></div>
                        </div>

                        <div className="information">
                            <div className="speed"> Humidity : {humidity} %</div>
                            <div className="pressure">Pressure : {pressure} HPA</div>
                            <div className="description">{description}</div>
                        </div>
                    </div>

                </div>

                <div className="left">
                    <div className="temprature">{temperature}°C  </div>
                    <div className="weatherImage">
                        <ImgWeather desc={descNote} />
                    </div>
                </div>

            </div>
            <div className="bottom">
                {list.map((item) =>
                    <Card day={item.day} temp={item.temperature} desc={item.desc} key={item.day} />
                )}

            </div>
        </div>


    );
}

export default Weather;