import { document } from '../utilities/windowWrapper'
import createEffectTogglesContainer from './createEffectTogglesContainer'
import insertElementRightAfter from './insertElementRightAfter'

const createWarningsContainer = () => {
	const warningsContainer = document.createElement('div')
	warningsContainer.classList.add('warnings-container')
	warningsContainer.style.padding = '20px'

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || createEffectTogglesContainer()
	insertElementRightAfter(warningsContainer, effectTogglesContainer)

	return warningsContainer
}

export default createWarningsContainer
