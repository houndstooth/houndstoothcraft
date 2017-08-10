import canvas from '../render/canvas'
import fileSaver from 'file-saver'
import store from '../../store'

export default () => canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${store.lastSavedAnimationFrame}.png`)
	store.lastSavedAnimationFrame++
})
