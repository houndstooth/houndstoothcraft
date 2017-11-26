import { DataBlob } from '../'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { main as saveBlob } from './saveBlob'

const saveCanvas: (result: DataBlob) => void =
	(result: DataBlob): void => {
		saveBlob({ blob: result, name: `${state.lastSavedFrame}.png` })
		state.lastSavedFrame = to.Frame(from.Frame(state.lastSavedFrame) + 1)
	}

export { saveCanvas as main }
