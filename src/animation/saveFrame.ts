import state from '../state'
import saveBlob from './saveBlob'

const saveFrame: { ({}: { blob: any }): void } = ({ blob }) => {
	saveBlob({ blob, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame++
}

export default saveFrame
