import { state } from '../../state'
import { windowWrapper } from '../dom'

const clearInterval: (_: string) => void =
	(intervalStateNodeName: string): void => {
		windowWrapper.clearInterval(state.execute[intervalStateNodeName] as number)
		state.execute[intervalStateNodeName] = undefined
	}

export default clearInterval
