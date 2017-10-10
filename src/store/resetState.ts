import { changeObjectIntoCopy } from '../utilities/codeUtilities'
import { DEFAULT_STATE } from './defaults'
import State from './State'

const resetState: { ({}: State): void } = state => {
	changeObjectIntoCopy({
		objectToChange: state,
		objectWithProperties: DEFAULT_STATE,
	})
}

export default resetState
