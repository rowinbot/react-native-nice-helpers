import addPx from 'add-px-to-style'
import hyphenate from 'hyphenate-style-name'
import { intoHTMLProp } from '../Strings'
import { isEmpty } from '../Conditionals'

const csslize = obj => {
  const keys = Object.keys(obj)

  if (!keys.length) return ''

  let len = keys.length,
    result = ''

  for (let i = 0; i < len; i++) {
    const key = keys[i]
    const val = obj[key]

    result += hyphenate(key) + ':' + addPx(key, val) + ';'
  }

  return result
}

export const getClassProps = html => html.match(/class=['|"]([^'|"]*)['|"]/g)

export const getClasses = html => {
  const classes = getClassProps(html)

  if (isEmpty(classes)) return []

  return [
    ...classes.reduce((newAry, el) => {
      const names = el.slice(7, el.length - 1).split(' ')

      return [...newAry, { query: el, names }]
    }, [])
  ]
}

export const injectStyles = (html, styles) => {
  const classes = getClasses(html)
  let result = html

  if (isEmpty(classes)) return html

  for (let i = 0; i < classes.length; i++) {
    let stylesGot = {}

    for (let ii = 0; ii < classes[i].names.length; ii++) {
      if (!isEmpty(styles[classes[i].names[ii]]))
        stylesGot = { ...stylesGot, ...styles[classes[i].names[ii]] }
    }

    result = result.replace(
      classes[i].query,
      intoHTMLProp('style', csslize(stylesGot))
    )
  }

  return result
}

export default csslize
