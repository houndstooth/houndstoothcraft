import { Houndstooth } from '../store'
import { document } from '../utilities/windowWrapper'
import addEffectToggle from './addEffectToggle'

const maybeAddEffectToggles: { (effects: Houndstooth[]): void } = effects => {
	if (!document.querySelector('.effect-toggles-container')) {
		effects.forEach(addEffectToggle)
	}
}

export default maybeAddEffectToggles
