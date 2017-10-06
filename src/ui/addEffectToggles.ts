import { document } from '../utilities/windowWrapper'
import addEffectToggle from './addEffectToggle'

const addEffectToggles = effects => document.querySelector('.effect-toggles-container') || effects.forEach(addEffectToggle)

export default addEffectToggles
