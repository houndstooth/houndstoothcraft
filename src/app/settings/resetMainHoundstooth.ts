import { DEFAULT_HOUNDSTOOTH } from '../../defaults'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const resetMainHoundstooth: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState.settings.mainHoundstooth,
			objectWithProperties: DEFAULT_HOUNDSTOOTH,
		})
	}

export default resetMainHoundstooth
