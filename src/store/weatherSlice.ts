/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiData, Coord, Forecast } from '../types'
import { RootState } from './store'

type SliceState = {
  cities: ApiData[]
  error: any
}

const initialState: SliceState = {
  cities: [],
  error: null,
}

type ForecastAction = {
  coord: Coord
  id: number
}

export const fetchForecast = createAsyncThunk('weather/fetchForecast', async (param: ForecastAction) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${param.coord.lat}&lon=${param.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
    )
    return { id: param.id, data: response.data as Forecast }
  } finally {
    // required by my eslint rules
  }
})

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
    )
    return response.data as ApiData
  } finally {
    // required by my eslint rules
  }
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForecast.fulfilled, (state, action) => {
        const index = state.cities.findIndex((e) => e.id === action.payload.id)
        if (index !== -1) {
          state.cities[index].forecast = action.payload.data
        }
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const index = state.cities.findIndex((e) => e.id === action.payload.id)
        if (index === -1) {
          state.cities.push(action.payload)
        } else {
          action.payload.forecast = state.cities[index].forecast
          state.cities[index] = action.payload
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default weatherSlice.reducer
