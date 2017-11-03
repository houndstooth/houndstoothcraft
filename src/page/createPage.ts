// tslint:disable:no-unsafe-any

import { PAGE_BACKGROUND_COLOR } from '../constants'
import { parseColor } from '../render'
import { Effect } from '../store'
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
			document.body.style.backgroundColor = parseColor(PAGE_BACKGROUND_COLOR)
		}
	}

export { createPage }
