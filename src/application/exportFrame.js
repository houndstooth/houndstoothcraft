import canvas from '../render/canvas'
import fileSaver from 'file-saver'

export default () => canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${current.lastSavedAnimationFrame}.png`)
	current.lastSavedAnimationFrame++
})
