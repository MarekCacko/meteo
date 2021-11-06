/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiData, WeatherMap } from '../types'
import { RootState } from './store'

type SliceState = {
  cities: WeatherMap
  status: 'loading' | 'succeeded' | 'idle' | 'failed'
  error: any
}

const initialState: SliceState = {
  cities: {},
  status: 'idle',
  error: null,
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=Bratislava&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
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
      .addCase(fetchWeather.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cities[action.payload.name] = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const getWeather = (state: RootState) => {
  return state.weather.cities
}

export default weatherSlice.reducer

/*

// First, define the reducer and action creators via `createSlice`
const usersSlice = createSlice({
  name: 'users',

  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.users = action.payload
      }
    },
  },
})

// Destructure and export the plain action creators
export const { usersLoading, usersReceived } = usersSlice.actions

// Define a thunk that dispatches those action creators
const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading())
  const response = await usersAPI.fetchAll()
  dispatch(usersReceived(response.data))
}

*/
