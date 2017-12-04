import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { Context, Px } from '../dom'
import { getSetting } from '../settings'
import clearContext from './clearContext'

const mixDownContexts: NullarySideEffector =
	(): void => {
		const canvasSize: Px = getSetting.default('canvasSize')
		clearContext({ canvasSize, context: state.canvas.mixedDownContext })

		state.canvas.contexts.forEach((context: Context): void => {
			// tslint:disable-next-line:no-unsafe-any
			state.canvas.mixedDownContext.drawImage(context.canvas, 0, 0)
		})
	}

export default mixDownContexts
