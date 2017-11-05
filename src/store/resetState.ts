import { changeObjectIntoCopy } from '../utilities/codeUtilities'
import { DEFAULT_STATE } from './defaults'
import { State } from './types'

const resetState: (_: State) => void =
	(state: State): void => {
		changeObjectIntoCopy({
			objectToChange: state,
			objectWithProperties: DEFAULT_STATE,
		})
		state.patternRef = Math.random()
	}

export { resetState }
