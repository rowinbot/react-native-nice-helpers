import { Text } from 'react-native'
import { isEmpty } from './Conditionals'
import { DEFAULT_FONT, DEFAULT_FONT_TYPE } from '../constants/projectConstants'

/* Returns the last word of a URL (string) */
export const lastWord = str => str.split('/').pop()

/* Returns the last letter of a String */
export const lastLetter = str => str[str.length - 1]

/* Returns a String with a slash at the end */
export const slashToURL = url => url + '/'

export const capitalize = str => (!isEmpty(str) ? str.toLocaleUpperCase() : '')

export const toLowCase = str => (str ? str.toLocaleLowerCase() : str)

export const capitalizeSentence = str =>
  !isEmpty(str) ? str.replace(/\b\w/g, l => l.toLocaleUpperCase()) : ''

export const capitalizeTitle = str =>
  !isEmpty(str)
    ? str
        .toLocaleLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toLocaleUpperCase() + s.substring(1))
        .join(' ')
    : ''

export const camelToSnake = str => str.replace(/([A-Z])/g, $1 => '_'.concat($1.toLocaleLowerCase()))

export const addBearer = str => (str ? (str.startsWith('Bearer') ? `Bearer ${str}` : str) : null)

export const ensureNotScaling = () => {
  if (isEmpty(Text.defaultProps)) Text.defaultProps = {}

  Text.defaultProps.allowFontScaling = false
}

export const getFont = (type, font) => `${font || DEFAULT_FONT}-${type || DEFAULT_FONT_TYPE}`

export const renderNewLines = html => html.replace(/\n/g, '</br>')
