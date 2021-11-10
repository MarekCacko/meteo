const getDateTime = (sunset: number, sunrise: number) => {
  const time = new Date((sunset - sunrise) * 1000).toISOString().substr(11, 8)
  return `${Number(time.substring(0, 2))}h ${Number(time.substring(3, 5))}m`
}

// eslint-disable-next-line import/prefer-default-export
export { getDateTime }
