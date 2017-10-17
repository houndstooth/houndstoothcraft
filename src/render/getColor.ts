import state from '../state'
import { wrappedIndex } from '../utilities/codeUtilities'
import { Color } from './types'

const getColor: (_: { index: number }) => Color = ({ index }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const colorSettings = basePattern.colorSettings || {}
	const array = colorSettings.colorSet || []

	return wrappedIndex({ array, index })
}

export default getColor
