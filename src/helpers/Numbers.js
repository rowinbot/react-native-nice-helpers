export const isPrime = num => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return true
  return num === 1
}

export const percentOf = (percent, whole) => (percent / 100) * whole

export const skipDecimal = num => `${num}`.split('.')[0]

export const addZ = dateNumeric =>
  dateNumeric < 10 ? '0' + dateNumeric : '' + dateNumeric
