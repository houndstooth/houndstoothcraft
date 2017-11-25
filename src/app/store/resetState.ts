import { DEFAULT_STATE } from '../../state'
import { State } from '../../types'
import { codeUtilities } from '../../utilities'

const resetState: (_: State) => void =
	(state: State): void => {
		const previousPatternRef: number = state.patternRef
		codeUtilities.changeObjectIntoCopy({
			objectToChange: state,
			objectWithProperties: DEFAULT_STATE,
		})
		state.patternRef = previousPatternRef + 1
	}

export { resetState as main }
