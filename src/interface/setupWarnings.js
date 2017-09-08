import theInterface from '../interface'
import setupEffectTogglesContainer from './setupEffectTogglesContainer'

export default () => {
	const warnings = document.createElement('div')
	warnings.classList.add('warnings')
	warnings.style.padding = '20px'

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || setupEffectTogglesContainer()
	theInterface.insertElementRightAfter(warnings, effectTogglesContainer)

	return warnings
}
