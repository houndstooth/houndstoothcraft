// tslint:disable:no-unsafe-any

import { executeSelectedHoundstoothEffects } from '../execute/executeSelectedHoundstoothEffects'
import { state } from '../state'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import { document, window } from '../utilities/windowWrapper'

const xmlns: string = 'http://www.w3.org/2000/svg'

const createAnimationControls: NullarySideEffector =
	(): void => {
		const animationControlsContainer: HTMLElement = document.createElement('div')
		animationControlsContainer.classList.add('animation-controls-container')
		document.body.appendChild(animationControlsContainer)

		const playPaths: string[] = [ 'M 10 5 L 20 15 L 10 25 Z' ]
		const playButton: HTMLElement = createAnimationControlButton(animationControlsContainer, playPaths)
		playButton.onclick = playClickHandler

		const pausePaths: string[] = [ 'M 5 5 L 13 5 L 13 25 L 5 25 Z', 'M 17 5 L 25 5 25 25 17 25 Z' ]
		const pauseButton: HTMLElement = createAnimationControlButton(animationControlsContainer, pausePaths)
		pauseButton.onclick = pauseClickHandler

		const rewindPaths: string[] = [ 'M 25 5 L 15 15 L 15 5 L 5 15 L 15 25 L 15 15 L 25 25 Z' ]
		const rewindButton: HTMLElement = createAnimationControlButton(animationControlsContainer, rewindPaths)
		rewindButton.onclick = rewindClickHandler
	}

const createAnimationControlButton: (animationControlsContainer: HTMLElement, ds: string[]) => HTMLElement =
	(animationControlsContainer: HTMLElement, ds: string[]): HTMLElement => {
		const button: HTMLElement = document.createElement('div')
		button.style.display = 'inline-block'
		button.style.cursor = 'pointer'
		button.style.border = '1px solid #000'
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

const playClickHandler: NullarySideEffector =
	(): void => {
		if (!state.animating) {
			state.animating = true
			if (state.currentFrame === to.Frame(0)) {
				executeSelectedHoundstoothEffects()
			}
		}
	}

const pauseClickHandler: NullarySideEffector =
	(): void => {
		state.animating = false
	}

const rewindClickHandler: NullarySideEffector =
	(): void => {
		window.clearInterval(state.interval)
		state.currentFrame = to.Frame(0)
		executeSelectedHoundstoothEffects()
	}

export { createAnimationControls }
