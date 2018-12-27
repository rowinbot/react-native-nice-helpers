/**-------------------------------------------------- 
  This function takes a RGB color and turn it into a 
  RGB or RGBA depending on user choice (alpha), 
  then with that color it returns a Object and add
  the property needed. 
  (check ReactNative style properties name guide)
  --------------------------------------------------**/
export const alphaRGBStyle = (name, rgb, a) => {
  if (hasAlpha(rgb)) return { [name]: rgb }

  const splitted = rgb.slice(4, rgb.length - 1).split(',')

  const r = parseFloat(splitted[0]),
    g = parseFloat(splitted[1]),
    b = parseFloat(splitted[2])

  return a
    ? { [name]: `rgba(${r},${g},${b},${a})` }
    : { [name]: `rgb(${r},${g},${b})` }
}

export const alphaRGB = (rgb, a) => {
  if (hasAlpha(rgb)) return rgb

  const splitted = rgb.slice(4, rgb.length - 1).split(',')

  const r = parseFloat(splitted[0]),
    g = parseFloat(splitted[1]),
    b = parseFloat(splitted[2])

  return a ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`
}

/**-------------------------------------------------- 
  This function takes a RGB color and turn it darker
  based on the percentage (float) you give.
  --------------------------------------------------**/
export const darkerColor = (rgb, percent) => {
  var f = rgb.split(','),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = parseInt(f[0].slice(4)),
    G = parseInt(f[1]),
    B = parseInt(f[2])

  return `rgb(${Math.round((t - R) * p) + R}, ${Math.round((t - G) * p) +
    G}, ${Math.round((t - B) * p) + B})`
}

export const hasAlpha = rgb => !(rgb.slice(3, 4) === '(')
