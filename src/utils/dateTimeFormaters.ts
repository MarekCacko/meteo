const forecastDay = (dt: number) => {
  const string = `${new Date(dt * 1000).toLocaleDateString('en-UK', {
    weekday: 'short',
    day: '2-digit',
  })}`
  return `${string.slice(0, 3)},${string.slice(3)}`
}

const sunTime = (dt: number) =>
  `${new Date(dt * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    hourCycle: 'h11',
  })}`

const formatTime = (dt: Date) =>
  dt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    hourCycle: 'h11',
  })

const formatDate = (dt: Date) =>
  dt.toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' })

export { forecastDay, formatDate, formatTime, sunTime }
