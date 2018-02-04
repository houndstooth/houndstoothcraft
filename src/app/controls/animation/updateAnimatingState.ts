import { appState } from '../../appState'
import mainHoundstoothHasAnimations from './mainHoundstoothHasAnimations'

const updateAnimatingState: () => void =
	(): void => {
		if (appState.controls.animating) {
			appState.controls.animating = mainHoundstoothHasAnimations()
		}
	}

export default updateAnimatingState
