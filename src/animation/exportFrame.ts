import { state } from '../state'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'
import { saveFrame } from './saveFrame'

const exportFrame: NullarySideEffector =
	() => state.mixedDownContext && state.mixedDownContext.canvas.toBlob(saveFrame)

export { exportFrame }
