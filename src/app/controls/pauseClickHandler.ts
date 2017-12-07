import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const pauseClickHandler: NullarySideEffector =
	(): void => {
		appState.controls.animating = false
		appState.dom.playButton.disabled = false
		appState.dom.pauseButton.disabled = true
	}

export default pauseClickHandler
