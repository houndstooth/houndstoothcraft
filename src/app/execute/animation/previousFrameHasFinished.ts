import { from } from '../../../utilities'
import { appState } from '../../appState'

const previousFrameHasFinished: () => boolean =
	(): boolean => appState.execute.tilesCompleted === 0 && from.Layer(appState.execute.currentLayer) === 0

export default previousFrameHasFinished
