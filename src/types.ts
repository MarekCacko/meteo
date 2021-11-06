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
  preasure: number
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
}

export interface WeatherMap {
  [key: string]: ApiData
}
