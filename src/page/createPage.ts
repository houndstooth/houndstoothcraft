import { Effect } from '../store/types'
import { createAnimationControls } from './createAnimationControls'
import { createLogo } from './createLogo'
import { createWarningsContainer } from './createWarningsContainer'
import { getFont } from './getFont'
import { maybeCreateEffectToggles } from './maybeCreateEffectToggles'

const createPage: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		createLogo()
		getFont()
		maybeCreateEffectToggles(effects)
		createWarningsContainer()
		createAnimationControls()
	}

export { createPage }
