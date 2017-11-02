import { Context, Px } from '../page'
import { state } from '../state'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types'

const clear: NullarySideEffector =
	(): void => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
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

export { clear }
