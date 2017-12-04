import { state } from '../../state'
import { windowWrapper } from '../../utilities'

const clearInterval: (_: string) => void =
	(intervalStateNodeName: string): void => {
		windowWrapper.clearInterval(state[intervalStateNodeName] as number)
		state[intervalStateNodeName] = undefined
	}

export default clearInterval
