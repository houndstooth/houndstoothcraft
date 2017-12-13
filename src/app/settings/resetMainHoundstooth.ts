import { codeUtilities } from '../../utilities'
import { appState } from '../appState'
import { DEFAULT_MAIN_HOUNDSTOOTH } from './defaults'

const resetMainHoundstooth: () => void =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState.settings.mainHoundstooth,
			objectWithProperties: DEFAULT_MAIN_HOUNDSTOOTH,
		})
	}

export default resetMainHoundstooth
