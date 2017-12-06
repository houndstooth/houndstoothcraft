import { NullarySideEffector } from '../../utilities'
import { Context } from '../dom'
import { state } from '../state'
import clearContext from './clearContext'

const mixDownContexts: NullarySideEffector =
	(): void => {
		clearContext(state.canvas.mixedDownContext)

		state.canvas.contexts.forEach((context: Context): void => {
			// tslint:disable-next-line:no-unsafe-any
			state.canvas.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export default mixDownContexts
