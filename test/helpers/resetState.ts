import { codeUtilities, defaults, state } from '../../src'

const resetState: () => void =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: state,
			objectWithProperties: defaults.DEFAULT_STATE,
		})
	}

export default resetState
