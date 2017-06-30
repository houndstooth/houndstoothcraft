import canvas from './render/canvas'
import fileSaver from 'file-saver'

export default () => canvas.toBlob(blob => {
	fileSaver.saveAs(blob, current.lastSavedFrame + ".png")
	current.lastSavedFrame++
})
