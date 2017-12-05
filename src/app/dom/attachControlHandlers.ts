import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import {
	frameInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
} from '../controls'

const attachControlHandlers: NullarySideEffector =
	(): void => {
		state.dom.frameInput.onchange = frameInputChangeHandler.default
		state.dom.playButton.onclick = playClickHandler.default
		state.dom.pauseButton.onclick = pauseClickHandler.default
		state.dom.rewindButton.onclick = rewindClickHandler.default
		state.dom.snapshotButton.onclick = snapshotClickHandler.default
	}

export default attachControlHandlers
