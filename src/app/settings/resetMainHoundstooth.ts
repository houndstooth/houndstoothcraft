import { codeUtilities, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { DEFAULT_MAIN_HOUNDSTOOTH } from './defaults'

const resetMainHoundstooth: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState.settings.mainHoundstooth,
			objectWithProperties: DEFAULT_MAIN_HOUNDSTOOTH,
		})
	}

export default resetMainHoundstooth
