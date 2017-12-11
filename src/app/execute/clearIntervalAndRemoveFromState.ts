import { globalWrapper } from '../../utilities'
import { appState } from '../appState'

const clearIntervalAndRemoveFromState: (_: string) => void =
	(intervalStateNodeName: string): void => {
		globalWrapper.window.clearInterval(appState.execute[intervalStateNodeName] as number)
		appState.execute[intervalStateNodeName] = undefined
	}

export default clearIntervalAndRemoveFromState
