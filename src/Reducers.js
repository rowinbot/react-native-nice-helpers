export const withState = state => action => ({ ...state, ...action })
