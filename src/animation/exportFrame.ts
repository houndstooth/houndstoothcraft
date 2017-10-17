import state from '../state'
import { NullarySideEffector } from '../utilities/types'
import saveFrame from './saveFrame'

const exportFrame: NullarySideEffector = (
	() => state.mixedDownContext && state.mixedDownContext.canvas.toBlob(saveFrame)
) as NullarySideEffector

export default exportFrame
