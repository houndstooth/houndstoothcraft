import { appState } from '../../appState'

import clearContext from './clearContext'

const mixDownContexts: () => void =
	(): void => {
		clearContext(appState.render.mixedDownContext)

		appState.render.contexts.forEach((context: CanvasRenderingContext2D): void => {
			// tslint:disable-next-line:no-unsafe-any
			appState.render.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export default mixDownContexts
