import { changeObjectIntoCopy } from '../utilities/codeUtilities'
import { DEFAULT_STATE } from './defaults'

const resetState = state => {
	changeObjectIntoCopy({
		objectToChange: state,
		objectWithProperties: DEFAULT_STATE,
	})
}

export default resetState
