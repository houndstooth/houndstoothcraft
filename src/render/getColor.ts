import { getFromBaseOrDefaultPattern } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import { Color } from './types'

const getColor: (_: { index: number }) => Color = ({ index }) =>
	wrappedIndex({ array: getFromBaseOrDefaultPattern('colorSet'), index })

export { getColor }
