import insertElementRightAfter from './insertElementRightAfter'
import setupEffectTogglesContainer from './setupEffectTogglesContainer'

export default () => {
	const warnings = document.createElement('div')
	warnings.classList.add('warnings')
	warnings.style.padding = '20px'

	const effectTogglesContainer = document.querySelector('.effect-toggles-container') || setupEffectTogglesContainer()
	insertElementRightAfter(warnings, effectTogglesContainer)

	return warnings
}
