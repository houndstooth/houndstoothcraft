import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { Context, Px } from '../dom'
import { getSetting } from '../settings'
import clearContext from './clearContext'

const clearContexts: NullarySideEffector =
	(): void => {
		const canvasSize: Px = getSetting.default('canvasSize')
		state.contexts.forEach((context: Context): void => {
			clearContext({ context, canvasSize })
		})
	}

export default clearContexts
