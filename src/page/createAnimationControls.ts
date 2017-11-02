// tslint:disable:no-unsafe-any

import { pauseClickHandler, playClickHandler, rewindClickHandler } from '../ui'
import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'

const xmlns: string = 'http://www.w3.org/2000/svg'

const createAnimationControls: NullarySideEffector =
	(): void => {
		const animationControlsContainer: HTMLElement = document.createElement('div')
		animationControlsContainer.classList.add('animation-controls-container')
		document.body.appendChild(animationControlsContainer)

		const playPaths: string[] = [ 'M 10 5 L 20 15 L 10 25 Z' ]
		const playButton: HTMLButtonElement = createAnimationControlButton(animationControlsContainer, playPaths)
		playButton.onclick = playClickHandler
		playButton.classList.add('play-button')

		const pausePaths: string[] = [ 'M 5 5 L 13 5 L 13 25 L 5 25 Z', 'M 17 5 L 25 5 25 25 17 25 Z' ]
		const pauseButton: HTMLButtonElement = createAnimationControlButton(animationControlsContainer, pausePaths)
		pauseButton.onclick = pauseClickHandler
		pauseButton.classList.add('pause-button')

		const rewindPaths: string[] = [ 'M 25 5 L 15 15 L 15 5 L 5 15 L 15 25 L 15 15 L 25 25 Z' ]
		const rewindButton: HTMLButtonElement = createAnimationControlButton(animationControlsContainer, rewindPaths)
		rewindButton.onclick = rewindClickHandler
		rewindButton.classList.add('rewind-button')
	}

const createAnimationControlButton: (animationControlsContainer: HTMLElement, ds: string[]) => HTMLButtonElement =
	(animationControlsContainer: HTMLElement, ds: string[]): HTMLButtonElement => {
		const button: HTMLButtonElement = document.createElement('button')
		button.style.display = 'inline-block'
		button.style.background = 'none'
		button.style.border = '3px solid #000'
		button.style.boxSizing = 'border-box'
		button.style.cursor = 'pointer'
		button.style.outline = 'none'
		button.style.margin = '5px'
		button.disabled = true

		animationControlsContainer.appendChild(button)

		const icon: SVGSVGElement = document.createElementNS(xmlns, 'svg')
		icon.style.width = '30'
		icon.style.height = '30'
		icon.style.fill = '#000'
		button.appendChild(icon)

		ds.forEach((d: string): void => {
			const path: SVGPathElement = document.createElementNS(xmlns, 'path')
			path.setAttribute('d', d)
			icon.appendChild(path)
		})

		return button
	}

export { createAnimationControls }
