import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import CurrentTemperature from '../../components/CurrentTemperature/CurrentTemperature'
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather'
import MeteoInfo from '../../components/MeteoInfo/MeteoInfo'
import MinMaxTemperature from '../../components/MinMaxTemperature/MinMaxTemperature'
import Barometer from '../../icons/barometer.svg'
import Clock from '../../icons/clock.svg'
import Humidity from '../../icons/humidity.svg'
import Sunrise from '../../icons/sunrise.svg'
import Sunset from '../../icons/sunset.svg'
import Wind from '../../icons/wind.svg'
import { fetchForecast } from '../../store/weatherSlice'
import { ApiData } from '../../types'
import { forecastDay, formatDate, formatTime, sunTime } from '../../utils/dateTimeFormaters'
import { getDateTime } from '../../utils/getDateTime'
import styles from './Weather.module.css'

interface Props {
  openLocation: () => void
  city: ApiData
}

const Weather = (props: Props) => {
  const { city, openLocation } = props

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => {
      clearInterval(timer)
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchForecast({ id: city.id, coord: city.coord }))
  }, [city.coord, city.id, dispatch])

  return (
    <section className={styles.weatherInfoContainer}>
      <div className={styles.infoPanel}>
        <div className={styles.dateTime}>
          {formatDate(date)} | {formatTime(date)}
        </div>
        <div role="link" tabIndex={0} onClick={openLocation} onKeyDown={openLocation} className={styles.locationLink}>
          {city.name}, Slovakia
        </div>
      </div>
      <div className={styles.cityInfo}>
        <CurrentWeather weather={city.weather[0].main} icon={city.weather[0].icon} />
        <CurrentTemperature temperature={Math.round(city.main.temp)} />
        <MinMaxTemperature min={Math.round(city.main.temp_min)} max={Math.round(city.main.temp_max)} />
        <MeteoInfo value={`${city.main.humidity}%`} description="Humidity" icon={Humidity} />
        <MeteoInfo
          value={`${new Intl.NumberFormat('en-US', {}).format(city.main.pressure)}mBar`}
          description="Pressure"
          icon={Barometer}
        />
        <MeteoInfo value={`${Math.round(city.wind.speed * 3.6)} km / h`} description="Wind" icon={Wind} />
        <MeteoInfo value={sunTime(city.sys.sunrise)} description="Sunrise" icon={Sunrise} />
        <MeteoInfo value={sunTime(city.sys.sunset)} description="Sunset" icon={Sunset} />
        <MeteoInfo value={`${getDateTime(city.sys.sunset, city.sys.sunrise)}`} description="Daytime" icon={Clock} />
        {city.forecast && (
          <>
            <MeteoInfo
              value={forecastDay(city.forecast.daily[1].dt)}
              description={`${Math.round(city.forecast.daily[1].temp.max)}°C ↑ ${Math.round(
                city.forecast.daily[1].temp.min,
              )}°C ↓`}
              icon={`https://openweathermap.org/img/wn/${city.forecast.daily[1].weather[0].icon}@2x.png`}
              shadow
            />
            <MeteoInfo
              value={forecastDay(city.forecast.daily[2].dt)}
              description={`${Math.round(city.forecast.daily[2].temp.max)}°C ↑ ${Math.round(
                city.forecast.daily[2].temp.min,
              )}°C ↓`}
              icon={`https://openweathermap.org/img/wn/${city.forecast.daily[2].weather[0].icon}@2x.png`}
              shadow
            />
            <MeteoInfo
              value={forecastDay(city.forecast.daily[3].dt)}
              description={`${Math.round(city.forecast.daily[3].temp.max)}°C ↑ ${Math.round(
                city.forecast.daily[3].temp.min,
              )}°C ↓`}
              icon={`https://openweathermap.org/img/wn/${city.forecast.daily[3].weather[0].icon}@2x.png`}
              shadow
            />
          </>
        )}
      </div>
    </section>
  )
}

export default Weather
