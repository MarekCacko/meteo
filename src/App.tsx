import React, { useEffect } from 'react'
import { batch, useDispatch } from 'react-redux'

import Location from './containers/Location/Location'
import { fetchWeather } from './store/weatherSlice'
import { cities } from './utils/cities'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    batch(() => {
      cities.forEach((city) => dispatch(fetchWeather(city)))
    })
  }, [dispatch])

  return (
    <div>
      <div>city placeholder</div>
      <Location />
    </div>
  )
}

export default App
