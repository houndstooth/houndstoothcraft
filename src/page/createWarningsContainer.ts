// tslint:disable:no-unsafe-any

import { FONT_SIZE } from '../constants'
import { DEFAULT_CANVAS_SIZE } from '../store/defaults'
import { document } from '../utilities/windowWrapper'
import { createEffectTogglesContainer } from './createEffectTogglesContainer'
import { insertElementRightAfter } from './insertElementRightAfter'
import { PageElement } from './types'

const createWarningsContainer: () => PageElement =
	(): PageElement => {
		const warningsContainer: PageElement = document.createElement('div')
		warningsContainer.classList.add('warnings-container')
		warningsContainer.style.padding = '20px'
		warningsContainer.style.display = 'block'
		warningsContainer.style.margin = 'auto'
		warningsContainer.style.width = DEFAULT_CANVAS_SIZE
		warningsContainer.style.fontFamily = 'Gilda Display'
		warningsContainer.style.fontSize = FONT_SIZE

		// tslint:disable-next-line:max-line-length
		const effectTogglesContainer: PageElement = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
		insertElementRightAfter(warningsContainer, effectTogglesContainer)

		return warningsContainer
	}

export { createWarningsContainer }
