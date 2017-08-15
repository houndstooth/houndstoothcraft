import fileSaver from 'file-saver'
import store from '../../store'

export default () => store.mixedDownCanvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${store.lastSavedAnimationFrame}.png`)
	store.lastSavedAnimationFrame++
})
