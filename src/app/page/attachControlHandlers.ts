// tslint:disable:no-unsafe-any

import { documentWrapper, NullarySideEffector } from '../../utilities'
import { pauseClickHandler, playClickHandler, rewindClickHandler, snapshotClickHandler } from '../ui'

const attachControlHandlers: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		playButton.onclick = playClickHandler.main

		const pauseButton: HTMLButtonElement = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		pauseButton.onclick = pauseClickHandler.main

		const rewindButton: HTMLButtonElement = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		rewindButton.onclick = rewindClickHandler.main

		const snapshotButton: HTMLButtonElement = documentWrapper.querySelector('#snapshot-button') as HTMLButtonElement
		snapshotButton.onclick = snapshotClickHandler.main
	}

export { attachControlHandlers as main }
