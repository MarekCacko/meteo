/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiData } from '../types'
import { RootState } from './store'

type SliceState = {
  cities: ApiData[]
  error: any
}

const initialState: SliceState = {
  cities: [],
  error: null,
}

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
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.cities.push(action.payload)
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export const getWeather = (state: RootState) => {
  return state.weather.cities
}

export default weatherSlice.reducer
