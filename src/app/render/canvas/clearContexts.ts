import { appState } from '../../appState'
import clearContext from './clearContext'

const clearContexts: () => void =
	(): void => {
		appState.render.contexts.forEach(clearContext)
	}

export default clearContexts
