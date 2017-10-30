// tslint:disable:no-unsafe-any

import { document } from '../utilities/windowWrapper'
import { createCanvasContainer } from './createCanvasContainer'
import { insertElementRightAfter } from './insertElementRightAfter'
import { PageElement } from './types'

const createEffectTogglesContainer: () => PageElement =
	(): PageElement => {
		const effectTogglesContainer: PageElement = document.createElement('div')
		effectTogglesContainer.classList.add('effect-toggles-container')
		effectTogglesContainer.style.padding = '20px'

		const canvasContainer: PageElement = document.querySelector('.canvas-container') || createCanvasContainer()
		insertElementRightAfter(effectTogglesContainer, canvasContainer)

		return effectTogglesContainer
	}

export { createEffectTogglesContainer }
