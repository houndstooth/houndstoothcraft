import { document } from '../utilities/windowWrapper'
import { Houndstooth } from '../store'
import addEffectToggle from './addEffectToggle'

const addEffectToggles: { (effects: Houndstooth[]): void } = effects => {
	document.querySelector('.effect-toggles-container') || effects.forEach(addEffectToggle)
}

export default addEffectToggles
