import { Context } from '../page'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'

const mixDownContexts: NullarySideEffector =
	(): void => {
		state.contexts.forEach((context: Context): void => {
			if (state.mixedDownContext) {
				// tslint:disable-next-line:no-unsafe-any
				state.mixedDownContext.drawImage(context.canvas, 0, 0)
			}
		})
	}

export { mixDownContexts }
