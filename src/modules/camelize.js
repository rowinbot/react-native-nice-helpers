const camelCase = str => str.replace(/_\w/g, m => m[1].toUpperCase())

const camelize = obj => {
  if (typeof obj === 'string') return camelCase(obj)

  return walk(obj)
}

function walk(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (isDate(obj) || isRegex(obj)) return obj
  if (isArray(obj)) return map(obj, walk)

  return reduce(
    objectKeys(obj),
    function(acc, key) {
      let camel = camelCase(key)

      acc[camel] = walk(obj[key])
      return acc
    },
    {}
  )
}

let isArray =
  Array.isArray ||
  function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

let isDate = obj => {
  return Object.prototype.toString.call(obj) === '[object Date]'
}

let isRegex = obj => {
  return Object.prototype.toString.call(obj) === '[object RegExp]'
}

let has = Object.prototype.hasOwnProperty

let objectKeys =
  Object.keys ||
  function(obj) {
    let keys = []
    for (let key in obj) {
      if (has.call(obj, key)) keys.push(key)
    }
    return keys
  }

function map(xs, f) {
  if (xs.map) return xs.map(f)
  let res = []
  for (let i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i))
  }
  return res
}

function reduce(xs, f, acc) {
  if (xs.reduce) return xs.reduce(f, acc)
  for (let i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i], i)
  }
  return acc
}

export default camelize
