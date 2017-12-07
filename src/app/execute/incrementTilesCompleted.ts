import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const incrementTilesCompleted: NullarySideEffector =
	(): void => {
		appState.execute.tilesCompleted++
	}

export default incrementTilesCompleted
