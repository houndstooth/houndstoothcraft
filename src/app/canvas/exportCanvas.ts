import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import saveCanvas from './saveCanvas'

const exportCanvas: NullarySideEffector =
	// tslint:disable-next-line:no-unsafe-any
	(): void => state.mixedDownContext && state.mixedDownContext.canvas.toBlob(saveCanvas)

export default exportCanvas
