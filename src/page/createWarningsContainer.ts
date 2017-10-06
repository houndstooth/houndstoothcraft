import insertElementRightAfter from './insertElementRightAfter'
import createEffectTogglesContainer from './createEffectTogglesContainer'
import { document } from '../utilities/windowWrapper'

const createWarningsContainer = () => {
	const warningsContainer = document.createElement('div')
	warningsContainer.classList.add('warnings-container')
	warningsContainer.style.padding = '20px'

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	insertElementRightAfter(warningsContainer, effectTogglesContainer)

	return warningsContainer
}

export default createWarningsContainer
