import addEffectToggle from './addEffectToggle'
import { document } from '../utilities/windowWrapper'

const addEffectToggles = effects => document.querySelector('.effect-toggles-container') || effects.forEach(addEffectToggle)

export default addEffectToggles
