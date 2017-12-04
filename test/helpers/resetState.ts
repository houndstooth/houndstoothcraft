import { codeUtilities, DEFAULT_STATE, state } from '../../src'

const resetState: () => void =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: state,
			objectWithProperties: DEFAULT_STATE,
		})
	}

export default resetState
