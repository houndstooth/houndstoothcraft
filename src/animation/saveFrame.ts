import state from '../state'
import saveBlob from './saveBlob'

const saveFrame: { (result: Blob): void } = result => {
	saveBlob({ blob: result, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame++
}

export default saveFrame
