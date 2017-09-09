import consoleWrapper from '../utilities/consoleWrapper'
import store from '../store'

export default houndstooth => {
	return Object.keys(houndstooth).every(patternName => {
		if (!Object.keys(store.houndstoothStructure.HOUNDSTOOTH_STRUCTURE).includes(patternName)) {
			consoleWrapper.error(`attempted to compose a houndstooth with an unrecognized pattern: ${patternName}`)
			return false
		}
		return true
	})
}
