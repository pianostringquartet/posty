import { replace } from 'lodash'

const replaceAll = (aStr, pattern, replacement) =>
  replace(aStr, new RegExp(pattern, 'g'), replacement)

export const toURLSafeStr = aStr => replaceAll(aStr, '\\s', '&')

export const toPostTitleStr = aStr => replaceAll(aStr, '\\&', ' ')
