const MILLISECONDS = 1000
const SECOND = 1 * MILLISECONDS
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 4.34 * WEEK
const YEAR = 12 * MONTH

export class TimeLocaleUse {
  static second = 's'
  static minute = 'm'
  static hour = 'h'
  static day = 'd'
  static week = 'w'
  static month = 'mo'
  static year = 'yr'

  static initialize(second, minute, hour, day, week, month, year) {
    TimeLocaleUse.second = second
    TimeLocaleUse.minute = minute
    TimeLocaleUse.hour = hour
    TimeLocaleUse.day = day
    TimeLocaleUse.week = week
    TimeLocaleUse.month = month
    TimeLocaleUse.year = year
  }
}

export const TimeUnits = {
  SECOND: {
    factor: SECOND,
    name: TimeLocaleUse.second
  },
  MINUTE: {
    factor: MINUTE,
    name: TimeLocaleUse.minute
  },
  HOUR: {
    factor: HOUR,
    name: TimeLocaleUse.hour
  },
  DAY: {
    factor: DAY,
    name: TimeLocaleUse.day
  },
  WEEK: {
    factor: WEEK,
    name: TimeLocaleUse.week
  },
  MONTH: {
    factor: MONTH,
    name: TimeLocaleUse.month
  },
  YEAR: {
    factor: YEAR,
    name: TimeLocaleUse.year
  }
}

export const getTimeUnit = timestamp => {
  if (
    timestamp <= TimeUnits.SECOND.factor ||
    (timestamp >= TimeUnits.SECOND.factor &&
      timestamp <= TimeUnits.MINUTE.factor)
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
  else if (
    timestamp <= TimeUnits.YEAR.factor ||
    timestamp >= TimeUnits.YEAR.factor
  )
    return 'YEAR'
}

export const getHours = timestamp => {
  const date = new Date()
  date.setTime(timestamp)

  return date.getHours()
}

export const timeAgo = timestamp => {
  const date = new Date()

  const currentDate = new Date()
  date.setTime(timestamp * 1000)

  const timeComparison = currentDate.getTime() - date.getTime()
  const unit = getTimeUnit(timeComparison)

  return `${Math.round(timeComparison / TimeUnits[unit].factor)}${
    TimeUnits[unit].name
  }`
}
