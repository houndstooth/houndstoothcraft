import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'

const clearAnimationIntervalAndRemoveFromState: () => void =
	(): void => {
		if (appState.execute.animationInterval) {
			globalWrapper.window.clearInterval(appState.execute.animationInterval)
			appState.execute.animationInterval = undefined
		}
	}

export default clearAnimationIntervalAndRemoveFromState
