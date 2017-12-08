import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import clearContext from './clearContext'

const mixDownContexts: NullarySideEffector =
	(): void => {
		clearContext(appState.canvas.mixedDownContext)

		appState.canvas.contexts.forEach((context: CanvasRenderingContext2D): void => {
			// tslint:disable-next-line:no-unsafe-any
			appState.canvas.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export default mixDownContexts
