import state from '../state'
import saveFrame from './saveFrame'

const exportFrame = () => state.mixedDownContext.context.canvas.toBlob(saveFrame)

export default exportFrame
