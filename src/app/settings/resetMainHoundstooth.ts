import { DEFAULT_HOUNDSTOOTH } from '../../defaults'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { state } from '../state'

const resetMainHoundstooth: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: state.settings.mainHoundstooth,
			objectWithProperties: DEFAULT_HOUNDSTOOTH,
		})
	}

export default resetMainHoundstooth
