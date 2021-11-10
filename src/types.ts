/* eslint-disable camelcase */
export type Coord = {
  lon: number
  lat: number
}

export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

export type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export type Wind = {
  speed: number
  deg: number
}

export type Sys = {
  type: number
  ide: number
  country: string
  sunrise: number
  sunset: number
}

export type ApiData = {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: {
    all: number
  }
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
  forecast: Forecast
}

export type DailyForecast = {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  clouds: number
  pop: number
  uvi: number
}

export type Forecast = {
  daily: DailyForecast[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}
