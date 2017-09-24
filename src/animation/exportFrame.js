import fileSaver from 'file-saver'
import state from '../state'

const exportFrame = () => state.mixedDownContext.context.canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${state.lastSavedAnimationFrame}.png`)
	state.lastSavedAnimationFrame++
})

export default exportFrame
