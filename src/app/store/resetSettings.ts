import { DEFAULT_HOUNDSTOOTH } from '../../defaults'
import { state } from '../../state'
import { codeUtilities, NullarySideEffector } from '../../utilities'

const resetSettings: NullarySideEffector =
	(): void => {
		const previousPatternRef: number = state.patternRef
		codeUtilities.changeObjectIntoCopy({
			objectToChange: state.mainHoundstooth,
			objectWithProperties: DEFAULT_HOUNDSTOOTH,
		})
		state.patternRef = previousPatternRef + 1
	}

export default resetSettings
