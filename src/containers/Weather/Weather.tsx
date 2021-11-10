import React, { useEffect, useState } from 'react'

import CurrentTemperature from '../../components/CurrentTemperature/CurrentTemperature'
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather'
import ImageHeader from '../../components/ImageHeader/ImageHeader'
import MeteoInfo from '../../components/MeteoInfo/MeteoInfo'
import MinMaxTemperature from '../../components/MinMaxTemperature/MinMaxTemperature'
import Barometer from '../../icons/barometer.svg'
import Clock from '../../icons/clock.svg'
import Humidity from '../../icons/humidity.svg'
import Sunrise from '../../icons/sunrise.svg'
import Sunset from '../../icons/sunset.svg'
import Wind from '../../icons/wind.svg'
import { ApiData } from '../../types'
import { getDateTime } from '../../utils/getDateTime'
import styles from './Weather.module.css'

interface Props {
  openLocation: () => void
  city: ApiData | null
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

  return (
    <main className={styles.main}>
      <ImageHeader />
      <>
        {city && (
          <section className={styles.weatherInfoContainer}>
            <div className={styles.infoPanel}>
              <div className={styles.dateTime}>
                {date.toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' })}{' '}
                |{' '}
                {date.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  hourCycle: 'h11',
                })}
              </div>
              <div
                role="link"
                tabIndex={0}
                onClick={openLocation}
                onKeyDown={openLocation}
                className={styles.locationLink}
              >
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
              <MeteoInfo
                value={`${new Date(city.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  hourCycle: 'h11',
                })}`}
                description="Sunrise"
                icon={Sunrise}
              />
              <MeteoInfo
                value={`${new Date(city.sys.sunset * 1000).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  hourCycle: 'h11',
                })}`}
                description="Sunset"
                icon={Sunset}
              />
              <MeteoInfo
                value={`${getDateTime(city.sys.sunset, city.sys.sunrise)}`}
                description="Daytime"
                icon={Clock}
              />
              <MeteoInfo value="Thu, 09" description="35°C" icon={Sunrise} shadow />
              <MeteoInfo
                value={`${new Date(city.sys.sunset * 1000).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  hourCycle: 'h11',
                })}`}
                description="Sunset"
                icon={Sunset}
                shadow
              />
              <MeteoInfo
                value={`${getDateTime(city.sys.sunset, city.sys.sunrise)}`}
                description="Daytime"
                icon={Clock}
                shadow
              />
            </div>
          </section>
        )}
      </>
    </main>
  )
}

export default Weather
