import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { main as saveCanvas } from './saveCanvas'

const exportCanvas: NullarySideEffector =
	// tslint:disable-next-line:no-unsafe-any
	(): void => state.mixedDownContext && state.mixedDownContext.canvas.toBlob(saveCanvas)

export { exportCanvas as main }
