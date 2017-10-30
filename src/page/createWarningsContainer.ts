// tslint:disable:no-unsafe-any

import { document } from '../utilities/windowWrapper'
import { createEffectTogglesContainer } from './createEffectTogglesContainer'
import { insertElementRightAfter } from './insertElementRightAfter'
import { PageElement } from './types'

const createWarningsContainer: () => PageElement =
	(): PageElement => {
		const warningsContainer: PageElement = document.createElement('div')
		warningsContainer.classList.add('warnings-container')
		warningsContainer.style.padding = '20px'

		// tslint:disable-next-line:max-line-length
		const effectTogglesContainer: PageElement = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
		insertElementRightAfter(warningsContainer, effectTogglesContainer)

		return warningsContainer
	}

export { createWarningsContainer }
