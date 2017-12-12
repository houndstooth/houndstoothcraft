import { codeUtilities } from '../utilities'
import { patternState } from './patternState'
import { FullPatternBaseValues } from './types'

const initializePatternState: (_: FullPatternBaseValues) => void =
	(initialPattern: FullPatternBaseValues): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: patternState,
			objectWithProperties: initialPattern,
		})
	}

export default initializePatternState
