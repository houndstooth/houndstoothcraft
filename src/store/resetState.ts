import { changeObjectIntoCopy } from '../utilities/codeUtilities'
import { DEFAULT_STATE } from './defaults'
import { State } from './types'

const resetState: (_: State) => void =
	(state: State): void => {
		const previousPatternRef: number = state.patternRef
		changeObjectIntoCopy({
			objectToChange: state,
			objectWithProperties: DEFAULT_STATE,
		})
		state.patternRef = previousPatternRef + 1
	}

export { resetState }
