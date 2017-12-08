import { globalWrapper } from '../../utilities'
import { appState } from '../appState'

const clearInterval: (_: string) => void =
	(intervalStateNodeName: string): void => {
		globalWrapper.window.clearInterval(appState.execute[intervalStateNodeName] as number)
		appState.execute[intervalStateNodeName] = undefined
	}

export default clearInterval
