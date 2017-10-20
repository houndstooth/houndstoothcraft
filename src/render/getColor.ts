import { state } from '../state'
import { wrappedIndex } from '../utilities/codeUtilities'
import { Color } from './types'

const getColor: (_: { index: number }) => Color = ({ index }) =>
	wrappedIndex({ array: state.mainHoundstooth.basePattern.colorSettings.colorSet, index })

export { getColor }
