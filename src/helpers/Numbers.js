// Milliseconds
const MILLISECONDS = 1000
const SECOND = 1 * MILLISECONDS
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 4.34 * WEEK
const YEAR = 12 * MONTH

export const TimeUnits = {
  SECOND: {
    factor: SECOND,
    name: 's'
  },
  MINUTE: {
    factor: MINUTE,
    name: 'm'
  },
  HOUR: {
    factor: HOUR,
    name: 'h'
  },
  DAY: {
    factor: DAY,
    name: 'd'
  },
  WEEK: {
    factor: WEEK,
    name: 'wk'
  },
  MONTH: {
    factor: MONTH,
    name: 'mo'
  },
  YEAR: {
    factor: YEAR,
    name: 'yr'
  }
}

export const isPrime = num => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return true
  return num === 1
}

export const percentOf = (percent, whole) => (percent / 100) * whole

export const getTimeUnit = timestamp => {
  if (
    timestamp <= TimeUnits.SECOND.factor ||
    (timestamp >= TimeUnits.SECOND.factor && timestamp <= TimeUnits.MINUTE.factor)
  )
    return 'SECOND'
  else if (
    timestamp <= TimeUnits.MINUTE.factor ||
    (timestamp >= TimeUnits.MINUTE.factor && timestamp <= TimeUnits.HOUR.factor)
  )
    return 'MINUTE'
  else if (
    timestamp <= TimeUnits.HOUR.factor ||
    (timestamp >= TimeUnits.HOUR.factor && timestamp <= TimeUnits.DAY.factor)
  )
    return 'HOUR'
  else if (
    timestamp <= TimeUnits.DAY.factor ||
    (timestamp >= TimeUnits.DAY.factor && timestamp <= TimeUnits.WEEK.factor)
  )
    return 'DAY'
  else if (
    timestamp <= TimeUnits.WEEK.factor ||
    (timestamp >= TimeUnits.WEEK.factor && timestamp <= TimeUnits.MONTH.factor)
  )
    return 'WEEK'
  else if (
    timestamp <= TimeUnits.MONTH.factor ||
    (timestamp >= TimeUnits.MONTH.factor && timestamp <= TimeUnits.YEAR.factor)
  )
    return 'MONTH'
  else if (timestamp <= TimeUnits.YEAR.factor || timestamp >= TimeUnits.YEAR.factor) return 'YEAR'
}

export const getHours = timestamp => {
  const date = new Date()
  date.setTime(timestamp)

  return date.getHours()
}

export const skipDecimal = num => `${num}`.split('.')[0]

export const timeAgo = timestamp => {
  const date = new Date()

  const currentDate = new Date()
  date.setTime(timestamp * 1000)

  const timeComparison = currentDate.getTime() - date.getTime()
  const unit = getTimeUnit(timeComparison)

  return `${Math.round(timeComparison / TimeUnits[unit].factor)}${TimeUnits[unit].name}`
}
