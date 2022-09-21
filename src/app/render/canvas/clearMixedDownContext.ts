import { appState } from '../../appState'

import clearContext from './clearContext'

const clearMixedDownContext: () => void =
	(): void =>	{
		clearContext(appState.render.mixedDownContext)
	}

export default clearMixedDownContext
