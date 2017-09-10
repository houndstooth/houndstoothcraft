import codeUtilities from '../utilities/codeUtilities'
import state from '../../state'

export default ({ index }) => {
	const array = state.mainHoundstooth.basePattern.colorSettings.colorSet
	return codeUtilities.wrappedIndex({ array, index })
}