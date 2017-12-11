import { ConditionFunction, from } from '../../utilities'
import { appState } from '../appState'

const previousFrameHasFinished: ConditionFunction =
	(): boolean => appState.execute.tilesCompleted === 0 && from.Layer(appState.execute.currentLayer) === 0

export default previousFrameHasFinished
