import { Card, TextField } from "@mui/material";
import styles from "./weatherComponent.module.css"
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import clear from '../assets/clear.png';
import mist from '../assets/mist.png';
import humidity from '../assets/humidity.png';
import clouds from '../assets/clouds.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';

const {VITE_API_KEY, VITE_API_URL} = import.meta.env;

const WeatherComponent = () => {
    const [image, setImage] = useState<string>(clear);
    const [city, setCity] = useState<string>('Tirupati');
    const [temp, setTemp] = useState<number>(26);
    const [humidityPercent, setHumidty] = useState<number>(48);
    const [windSpeed, setWindSpeed] = useState<number>(12);
    const [searchCity, setSearchCity]  = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [showWeather, setShowWeather] = useState<boolean>(false);

    const checkWeather = async () => {
        const response =  await fetch(VITE_API_URL + `&appId=${VITE_API_KEY}&q=${searchCity}`);
        if(response.status === 404){
            setError(true);
            setShowWeather(false);
        }else{
            setError(false);
            setShowWeather(true);
            let data = await response.json();
            // console.log("Data ========> ", data);
            setCity(data.name);
            const temperature = Math.round(data.main.temp);
            setTemp(temperature);
            setHumidty(data.main.humidity);
            setWindSpeed(data.wind.speed);
            setSearchCity('');
            if(data.weather[0].main === 'Clouds'){
                setImage(clouds);
            }else if(data.weather[0].main === 'Rain'){
                setImage(rain);
            }else if(data.weather[0].main === 'Drizzle'){
                setImage(drizzle);
            }else if(data.weather[0].main === 'Clear'){
                setImage(clear);
            }else if(data.weather[0].main === 'Mist'){
                setImage(mist);
            }else if(data.weather[0].main === 'Snow'){
                setImage(snow);
            }
        }
    } 

    return (
        <>
            <Card className={styles.card} sx={{
                height: showWeather ? '70vh' : '12vh'
            }}>
                <div>
                    <div className={styles.outerDiv}>
                        <div>
                            <TextField sx={{
                                width: 290,
                                "& .MuiOutlinedInput-root": {
                                    height: 40,
                                    borderRadius: '60px',
                                    backgroundColor: '#eaebec7c',
                                    "& fieldset": {
                                        border: "none",
                                    },
                                },
                            }} placeholder="Enter city name" value={searchCity} onChange={(event) => {
                                setSearchCity(event.target.value);
                            }}></TextField>
                        </div>
                        <div className={styles.innerDiv} onClick={() => {
                            if(searchCity){
                                checkWeather();
                            }
                        }}>
                            <LuSearch size={16} color="grey" style={{
                                marginTop: '10px'
                            }}/>
                        </div>
                    </div>
                    {error && <div style={{
                        color: 'rgb(236, 21, 21)',
                        marginLeft: '8%',
                        fontSize: '12px',
                        marginTop: '1%'
                    }}>Enter valid city</div>}
                </div>
                {showWeather && <div className={styles.outerDivTwo}>
                    <div className={styles.mainWeather}>
                        <div>
                            <img src={image} alt="Weather"  className={styles.weatherImage}/>
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: '45px'
                        }}>{temp + '  °C'}</div>
                        <div style={{
                            color: 'white',
                            fontSize: '35px'
                        }}>{city}</div>
                    </div>
                    <div className={styles.outerDiv1}>
                        <div className={styles.humidity}>
                            <div><img src={humidity} alt="Humidity" className={styles.humidityImg}/></div>
                            <div className={styles.innerHumidity}>
                                <div>{humidityPercent + ' %'}</div>
                                <div>Humidity</div>
                            </div>
                        </div>
                        <div className={styles.wind}>
                            <div><img src={wind} alt="Wind" className={styles.windImg}/></div>
                            <div className={styles.innerWind}>
                                <div>{windSpeed + ' km/h'}</div>
                                <div>Wind</div>
                            </div>
                        </div>
                    </div>
                </div>}
            </Card>
        </>
    )
}

export default WeatherComponent;