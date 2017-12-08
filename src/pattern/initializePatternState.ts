import { codeUtilities } from '../utilities'
import { get } from './patternState'
import { BasePattern } from './types'

const initializePatternState: (_: BasePattern) => void =
	(initialPattern: BasePattern): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: get(),
			objectWithProperties: initialPattern,
		})
	}

export default initializePatternState
