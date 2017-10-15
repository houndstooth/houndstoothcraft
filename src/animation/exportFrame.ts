import state from '../state'
import saveFrame from './saveFrame'
import { NullarySideEffector } from '../utilities/types'

const exportFrame: NullarySideEffector = (
	() => state.mixedDownContext && state.mixedDownContext.canvas.toBlob(saveFrame)
) as NullarySideEffector

export default exportFrame
