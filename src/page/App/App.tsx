import React, { useEffect, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import ImageHeader from '../../components/ImageHeader/ImageHeader'
import Location from '../../containers/Location/Location'
import Weather from '../../containers/Weather/Weather'
import { RootState } from '../../store/store'
import { fetchWeather } from '../../store/weatherSlice'
import { cities } from '../../utils/cities'
import { useMediaQuery } from '../../utils/useMedia'
import styles from './App.module.css'

const App = () => {
  const weather = useSelector((state: RootState) => state.weather.cities)
  const [currentCity, setCurrentCity] = useState<string>(weather.length > 0 ? weather[0].name : '')
  const [isLocationVisible, setLocationVisible] = useState(false)

  const city = useSelector((state: RootState) => state.weather.cities.find((c) => c.name === currentCity))

  const toggle = () => setLocationVisible((s) => !s)

  const changeCity = (cityName: string) => {
    setCurrentCity(cityName)
    toggle()
  }

  const dispatch = useDispatch()

  const fetchData = () => {
    batch(() => {
      cities.forEach((cityName) => dispatch(fetchWeather(cityName)))
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, [])

  useEffect(() => {
    const timer = setInterval(() => fetchData(), 15 * 60 * 1000)
    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    if (weather.length > 0) setCurrentCity(weather[0].name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather.length])

  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ImageHeader />
        {city && <Weather city={city} openLocation={toggle} />}
      </main>
      <Location changeCity={changeCity} visible={isDesktop || isLocationVisible} />
    </div>
  )
}

export default App
