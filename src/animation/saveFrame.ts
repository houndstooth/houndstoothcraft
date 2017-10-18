import { DataBlob } from '../page'
import { state } from '../state'
import { saveBlob } from './saveBlob'

const saveFrame: (result: DataBlob) => void = result => {
	saveBlob({ blob: result, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame++
}

export { saveFrame }
