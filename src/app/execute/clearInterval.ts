import { appState } from '../appState'
import { windowWrapper } from '../dom'

const clearInterval: (_: string) => void =
	(intervalStateNodeName: string): void => {
		windowWrapper.clearInterval(appState.execute[intervalStateNodeName] as number)
		appState.execute[intervalStateNodeName] = undefined
	}

export default clearInterval
