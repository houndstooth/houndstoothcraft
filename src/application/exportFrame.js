import canvas from '../render/canvas'
import fileSaver from 'file-saver'
import store from '../../store'

export default () => canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${store.currentState.lastSavedAnimationFrame}.png`)
	store.currentState.lastSavedAnimationFrame++
})
