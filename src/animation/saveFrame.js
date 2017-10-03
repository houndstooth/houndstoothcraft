import state from '../state'
import saveBlob from './saveBlob'

const saveFrame = blob => {
	saveBlob(blob, `${state.lastSavedAnimationFrame}.png`)
	state.lastSavedAnimationFrame++
}

export default saveFrame
