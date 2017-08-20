import fileSaver from 'file-saver'
import store from '../../store'

export default () => store.mixedDownContext.context.canvas.toBlob(blob => {
	fileSaver.saveAs(blob, `${store.lastSavedAnimationFrame}.png`)
	store.lastSavedAnimationFrame++
})
