import { appState } from '../../appState'

import mainHoundstoothHasAnimations from './mainHoundstoothHasAnimations'

const enableOrDisableAnimationControls: () => void =
	(): void => {
		const animating: boolean = appState.controls.animating
		const cannotBeAnimated: boolean = !mainHoundstoothHasAnimations()

		appState.dom.frameInput.disabled = cannotBeAnimated
		appState.dom.playButton.disabled = animating || cannotBeAnimated
		appState.dom.pauseButton.disabled = !animating
		appState.dom.rewindButton.disabled = !animating
	}

export default enableOrDisableAnimationControls
