import { Effect } from '../store/types'
import { createAnimationControls } from '../ui/createAnimationControls'
import { maybeAddEffectToggles } from '../ui/maybeAddEffectToggles'
import { createLogo } from './createLogo'
import { createWarningsContainer } from './createWarningsContainer'
import { getFont } from './getFont'

const createPage: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		createLogo()
		getFont()
		maybeAddEffectToggles(effects)
		createWarningsContainer()
		createAnimationControls()
	}

export { createPage }
