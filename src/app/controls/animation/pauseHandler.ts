import { appState } from '../../appState'

const pauseHandler: () => void =
	(): void => {
		appState.controls.animating = false
		appState.dom.playButton.disabled = false
		appState.dom.pauseButton.disabled = true
	}

export default pauseHandler
