import { createLogo } from './createLogo'
import { getFont } from './getFont'
import { maybeAddEffectToggles } from '../ui/maybeAddEffectToggles'
import { Effect } from '../store/types'
import { createWarningsContainer } from './createWarningsContainer'

const createPage: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		createLogo()
		getFont()
		maybeAddEffectToggles(effects)
		createWarningsContainer()
	}

export { createPage }
