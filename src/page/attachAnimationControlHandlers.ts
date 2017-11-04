// tslint:disable:no-unsafe-any

import { pauseClickHandler, playClickHandler, rewindClickHandler } from '../ui/animationControlHandlers'
import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'

const attachAnimationControlHandlers: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement = document.querySelector('.play-button') as HTMLButtonElement
		playButton.onclick = playClickHandler

		const pauseButton: HTMLButtonElement = document.querySelector('.pause-button') as HTMLButtonElement
		pauseButton.onclick = pauseClickHandler

		const rewindButton: HTMLButtonElement = document.querySelector('.rewind-button') as HTMLButtonElement
		rewindButton.onclick = rewindClickHandler
	}

export { attachAnimationControlHandlers }
