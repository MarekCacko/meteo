import React, { useEffect, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import Location from './containers/Location/Location'
import { RootState } from './store/store'
import { fetchWeather } from './store/weatherSlice'
import { ApiData } from './types'
import { cities } from './utils/cities'

function App() {
  const weather = useSelector((state: RootState) => state.weather.cities)
  const [currentCity, setCurrentCity] = useState<ApiData | null>(weather.length > 0 ? weather[0] : null)
  const [isLocationVisible, setLocationVisible] = useState(false)

  const toggle = () => setLocationVisible((s) => !s)

  const changeCity = (city: ApiData) => {
    setCurrentCity(city)
    toggle()
  }

  const dispatch = useDispatch()

  useEffect(() => {
    batch(() => {
      cities.forEach((city) => dispatch(fetchWeather(city)))
    })
  }, [dispatch])

  useEffect(() => {
    if (weather.length > 0) setCurrentCity(weather[0])
  }, [weather, weather.length])

  return (
    <div>
      <div role="link" tabIndex={0} onClick={toggle} onKeyDown={toggle}>
        {currentCity?.name}
      </div>
      <Location changeCity={changeCity} visible={isLocationVisible} />
    </div>
  )
}

export default App
