import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { Context } from '../dom'
import clearContext from './clearContext'

const mixDownContexts: NullarySideEffector =
	(): void => {
		clearContext(appState.canvas.mixedDownContext)

		appState.canvas.contexts.forEach((context: Context): void => {
			// tslint:disable-next-line:no-unsafe-any
			appState.canvas.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export default mixDownContexts
