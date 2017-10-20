import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { addEffectToggle } from './addEffectToggle'

const maybeAddEffectToggles: (effects: Effect[]) => void = effects => {
	if (!document.querySelector('.effect-toggles-container')) {
		effects.forEach(addEffectToggle)
	}
}

export { maybeAddEffectToggles }
