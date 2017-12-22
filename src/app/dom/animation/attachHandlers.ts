import { appState } from '../../appState'
import {
	frameInputHandler,
	pauseHandler,
	playHandler,
	rewindHandler,
	snapshotHandler,
} from '../../controls'

const attachHandlers: () => void =
	(): void => {
		appState.dom.frameInput.onchange = frameInputHandler.default
		appState.dom.playButton.onclick = playHandler.default
		appState.dom.pauseButton.onclick = pauseHandler.default
		appState.dom.rewindButton.onclick = rewindHandler.default
		appState.dom.snapshotButton.onclick = snapshotHandler.default
	}

export default attachHandlers
