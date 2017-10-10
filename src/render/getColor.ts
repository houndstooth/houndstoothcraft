import { wrappedIndex } from '../utilities/codeUtilities'
import state from '../state'
import Color from './Color'

const getColor: { ({}: { index: number }): Color } = ({ index }) => {
	const array = state.mainHoundstooth.basePattern.colorSettings.colorSet
	return wrappedIndex({ array, index })
}

export default getColor
