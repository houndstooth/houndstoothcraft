import { getSetting } from '../store'
import { wrappedIndex } from '../utilities/codeUtilities'
import { Color } from './types'

const getColor: (_: { index: number }) => Color = ({ index }) =>
	wrappedIndex({ array: getSetting('colorSet'), index })

export { getColor }
