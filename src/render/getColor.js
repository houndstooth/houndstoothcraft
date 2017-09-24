import { wrappedIndex } from '../utilities/codeUtilities'
import state from '../state'

const getColor = ({ index }) => {
	const array = state.mainHoundstooth.basePattern.colorSettings.colorSet
	return wrappedIndex({ array, index })
}

export default getColor
