import state from '../state'
import saveFrame from './saveFrame'
import { NullarySideEffector } from '../utilities/types'

const exportFrame: NullarySideEffector = () => state.mixedDownContext.canvas.toBlob(saveFrame)

export default exportFrame
