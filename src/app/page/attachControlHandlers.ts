// tslint:disable:no-unsafe-any

import { documentWrapper, NullarySideEffector } from '../../utilities'
import { pauseClickHandler, playClickHandler, rewindClickHandler, snapshotClickHandler } from '../ui'

const attachControlHandlers: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		playButton.onclick = playClickHandler.default

		const pauseButton: HTMLButtonElement = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		pauseButton.onclick = pauseClickHandler.default

		const rewindButton: HTMLButtonElement = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		rewindButton.onclick = rewindClickHandler.default

		const snapshotButton: HTMLButtonElement = documentWrapper.querySelector('#snapshot-button') as HTMLButtonElement
		snapshotButton.onclick = snapshotClickHandler.default
	}

export default attachControlHandlers
