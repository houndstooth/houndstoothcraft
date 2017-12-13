import { appState } from '../appState'
import {
	frameInputChangeHandler,
	pauseClickHandler,
	playClickHandler,
	rewindClickHandler,
	snapshotClickHandler,
} from '../controls'

const attachControlHandlers: () => void =
	(): void => {
		appState.dom.frameInput.onchange = frameInputChangeHandler.default
		appState.dom.playButton.onclick = playClickHandler.default
		appState.dom.pauseButton.onclick = pauseClickHandler.default
		appState.dom.rewindButton.onclick = rewindClickHandler.default
		appState.dom.snapshotButton.onclick = snapshotClickHandler.default
	}

export default attachControlHandlers
