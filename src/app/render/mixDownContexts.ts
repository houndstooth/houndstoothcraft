import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { Context } from '../page'

const mixDownContexts: NullarySideEffector =
	(): void => {
		state.contexts.forEach((context: Context): void => {
			// tslint:disable-next-line:no-unsafe-any no-unused-expression
			state.mixedDownContext && state.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export { mixDownContexts }