import { console } from '../utilities/windowWrapper'
import { HOUNDSTOOTH_STRUCTURE } from '../store'

const houndstoothHasOnlyRecognizedPatterns = houndstooth => {
	return Object.keys(houndstooth).every(patternName => {
		if (!Object.keys(HOUNDSTOOTH_STRUCTURE).includes(patternName)) {
			console.error(`attempted to compose a houndstooth with an unrecognized pattern: ${patternName}`)
			return false
		}
		return true
	})
}

export default houndstoothHasOnlyRecognizedPatterns
