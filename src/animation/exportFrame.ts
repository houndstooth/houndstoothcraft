import state from '../state'
import saveFrame from './saveFrame'

const exportFrame = (): void => state.mixedDownContext.canvas.toBlob(saveFrame)

export default exportFrame
