import { DEFAULT_HOUNDSTOOTH } from '../../defaults'
import { state } from '../../state'
import { codeUtilities, NullarySideEffector } from '../../utilities'

const resetMainHoundstooth: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: state.mainHoundstooth,
			objectWithProperties: DEFAULT_HOUNDSTOOTH,
		})
	}

export default resetMainHoundstooth
