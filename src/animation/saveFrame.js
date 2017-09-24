import fileSaver from 'file-saver'
import state from '../state'

const saveFrame = blob => {
	fileSaver.saveAs(blob, `${state.lastSavedAnimationFrame}.png`)
	state.lastSavedAnimationFrame++
}

export default saveFrame
