import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Location from './containers/Location/Location'
import { fetchWeather } from './store/weatherSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  return (
    <div>
      <Location />
    </div>
  )
}

export default App
