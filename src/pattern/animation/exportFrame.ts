import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { main as saveFrame } from './saveFrame'

const exportFrame: NullarySideEffector =
	// tslint:disable-next-line:no-unsafe-any
	(): void => state.mixedDownContext && state.mixedDownContext.canvas.toBlob(saveFrame)

export { exportFrame as main }
