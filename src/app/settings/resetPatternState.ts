import { patternState } from '../../pattern'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const resetPatternState: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: patternState.get(),
			objectWithProperties: appState.settings.mainHoundstooth.basePattern,
		})
	}

export default resetPatternState
