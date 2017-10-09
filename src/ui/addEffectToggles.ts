import { document } from '../utilities/windowWrapper'
import addEffectToggle from './addEffectToggle'

const addEffectToggles = effects => {
	return document.querySelector('.effect-toggles-container') || effects.forEach(addEffectToggle)
}

export default addEffectToggles
