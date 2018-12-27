import { addZ } from './Numbers'

export class DatesLocaleUse {
  // Default Time Delimiters
  static DATE_DELIM = '/'
  static TIME_DELIM = ':'

  // Default TimeSystem Delimiters
  static AM_DELIM = 'AM'
  static PM_DELIM = 'PM'

  static initialize(dateDelim, timeDelim, amDelim, pmDelim) {
    DatesLocaleUse.DATE_DELIM = dateDelim
    DatesLocaleUse.TIME_DELIM = timeDelim
    DatesLocaleUse.AM_DELIM = amDelim
    DatesLocaleUse.PM_DELIM = pmDelim
  }
}

export const formatDate = date => {
  const isPM = date.getHours() > 12 ? true : false

  return [
    addZ(date.getDate()),
    addZ(date.getMonth() + 1),
    `${date.getFullYear()} ${[
      addZ(make12Houred(date.getHours())),
      addZ(date.getMinutes()),
      isPM ? DatesLocaleUse.PM_DELIM : DatesLocaleUse.AM_DELIM
    ].join(DatesLocaleUse.TIME_DELIM)}`
  ].join(DatesLocaleUse.DATE_DELIM)
}

export const parseDate = date => {
  const splitted = date
    .replace(
      new RegExp(DatesLocaleUse.DATE_DELIM, 'g'),
      DatesLocaleUse.TIME_DELIM
    )
    .replace(new RegExp(' '), DatesLocaleUse.TIME_DELIM)
    .replace(' ', DatesLocaleUse.TIME_DELIM)
    .split(DatesLocaleUse.TIME_DELIM)

  return new Date(
    splitted[2],
    splitted[1] - 1,
    splitted[0],
    make24Houred(splitted[3], splitted[5]),
    splitted[4]
  )
}

export const make12Houred = hours =>
  parseInt(hours) > 12
    ? parseInt(hours) - 12
    : parseInt(hours) === 0
    ? 12
    : parseInt(hours)

export const make24Houred = (hours, dayTime) =>
  dayTime === DatesLocaleUse.PM_DELIM ? parseInt(hours) + 12 : parseInt(hours)
