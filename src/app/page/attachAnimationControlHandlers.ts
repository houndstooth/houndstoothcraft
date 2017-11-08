// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { documentWrapper } from '../../utilities/windowWrapper'
import { animationControlHandlers } from '../ui'

const attachAnimationControlHandlers: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		playButton.onclick = animationControlHandlers.playClickHandler

		const pauseButton: HTMLButtonElement = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		pauseButton.onclick = animationControlHandlers.pauseClickHandler

		const rewindButton: HTMLButtonElement = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		rewindButton.onclick = animationControlHandlers.rewindClickHandler
	}

export { attachAnimationControlHandlers }
