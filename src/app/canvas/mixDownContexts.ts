import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { Context, Px } from '../page'
import { getSetting } from '../store'
import clearContext from './clearContext'

const mixDownContexts: NullarySideEffector =
	(): void => {
		const canvasSize: Px = getSetting.default('canvasSize')
		// tslint:disable-next-line:no-unused-expression no-void-expression
		state.mixedDownContext && clearContext({ canvasSize, context: state.mixedDownContext })

		state.contexts.forEach((context: Context): void => {
			// tslint:disable-next-line:no-unsafe-any no-unused-expression
			state.mixedDownContext && state.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export default mixDownContexts
