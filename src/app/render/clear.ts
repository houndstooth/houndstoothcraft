import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { Context, Px } from '../page'
import { getSetting } from '../store'

const clear: NullarySideEffector =
	(): void => {
		const canvasSize: Px = getSetting.main('canvasSize')
		state.contexts.forEach((context: Context): void => {
			clearContext({ context, canvasSize })
		})

		const maybeMixedDownContext: Context | undefined = state.mixedDownContext
		if (maybeMixedDownContext) {
			clearContext({ context: maybeMixedDownContext, canvasSize })
		}
	}

const clearContext: (_: { canvasSize: Px, context: Context }) => void =
	({ canvasSize, context }: { canvasSize: Px, context: Context }): void =>
		// tslint:disable-next-line:no-unsafe-any
		context.clearRect(0, 0, canvasSize, canvasSize)

export { clear as main }
