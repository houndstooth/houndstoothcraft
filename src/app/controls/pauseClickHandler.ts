import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'

const pauseClickHandler: NullarySideEffector =
	(): void => {
		state.controls.animating = false
		state.dom.playButton.disabled = false
		state.dom.pauseButton.disabled = true
	}

export default pauseClickHandler
