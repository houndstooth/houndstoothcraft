// tslint:disable:no-unsafe-any

import { Effect } from '../store/types'
import { document } from '../utilities/windowWrapper'
import { createAnimationControls } from './createAnimationControls'
import { createLogo } from './createLogo'
import { createWarningsContainer } from './createWarningsContainer'
import { getFont } from './getFont'
import { maybeCreateEffectToggles } from './maybeCreateEffectToggles'

const createPage: (effects: Effect[]) => void =
	(effects: Effect[]): void => {
		if (!document.querySelector('.logo')) {
			createLogo()
			getFont()
			maybeCreateEffectToggles(effects)
			createWarningsContainer()
			createAnimationControls()
			document.body.style.backgroundColor = '#eee'
		}
	}

export { createPage }
