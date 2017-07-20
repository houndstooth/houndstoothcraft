import canvas from '../render/canvas'
import fileSaver from 'file-saver'

export default () => canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${currentState.lastSavedAnimationFrame}.png`)
	currentState.lastSavedAnimationFrame++
})
