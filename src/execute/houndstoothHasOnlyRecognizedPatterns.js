import consoleWrapper from '../utilities/consoleWrapper'
import { houndstoothStructure } from '../store'

const houndstoothHasOnlyRecognizedPatterns = houndstooth => {
	return Object.keys(houndstooth).every(patternName => {
		if (!Object.keys(houndstoothStructure).includes(patternName)) {
			consoleWrapper.error(`attempted to compose a houndstooth with an unrecognized pattern: ${patternName}`)
			return false
		}
		return true
	})
}

export default houndstoothHasOnlyRecognizedPatterns
