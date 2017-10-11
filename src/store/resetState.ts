import { changeObjectIntoCopy } from '../utilities/codeUtilities'
import { DEFAULT_STATE } from './defaults'
import { State } from './types'

const resetState: { ({}: State): void } = state => {
	changeObjectIntoCopy({
		objectToChange: state,
		objectWithProperties: DEFAULT_STATE,
	})
}

export default resetState
