import fileSaver from 'file-saver'
import state from '../../state'

export default () => state.mixedDownContext.context.canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${state.lastSavedAnimationFrame}.png`)
	state.lastSavedAnimationFrame++
})
