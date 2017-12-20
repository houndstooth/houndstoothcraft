import { codeUtilities } from '../../../utilities'
import { appState } from '../../appState'

const initializeCurrentPatternFromBasePattern: () => void =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState.settings.currentPattern,
			objectWithProperties: appState.settings.mainHoundstooth.basePattern,
		})
	}

export default initializeCurrentPatternFromBasePattern
