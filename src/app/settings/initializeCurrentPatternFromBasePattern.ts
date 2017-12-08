import { codeUtilities, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const initializeCurrentPatternFromBasePattern: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState.settings.currentPattern,
			objectWithProperties: appState.settings.mainHoundstooth.basePattern,
		})
	}

export default initializeCurrentPatternFromBasePattern
