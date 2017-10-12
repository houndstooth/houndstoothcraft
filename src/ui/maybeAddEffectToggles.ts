import { document } from '../utilities/windowWrapper'
import { Houndstooth } from '../store'
import addEffectToggle from './addEffectToggle'

const maybeAddEffectToggles: { (effects: Houndstooth[]): void } = effects => {
	if (!document.querySelector('.effect-toggles-container')) {
		effects.forEach(addEffectToggle)
	}
}

export default maybeAddEffectToggles
