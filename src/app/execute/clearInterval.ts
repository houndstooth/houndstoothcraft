import { windowWrapper } from '../dom'
import { state } from '../state'

const clearInterval: (_: string) => void =
	(intervalStateNodeName: string): void => {
		windowWrapper.clearInterval(state.execute[intervalStateNodeName] as number)
		state.execute[intervalStateNodeName] = undefined
	}

export default clearInterval
