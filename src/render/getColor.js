import codeUtilities from '../utilities/codeUtilities'
import store from '../../store'

export default ({ index }) => {
	const array = store.mainHoundstooth.basePattern.colorSettings.set
	return codeUtilities.wrappedIndex({ array, index })
}
