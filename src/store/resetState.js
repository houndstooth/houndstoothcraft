import { DEFAULT_STATE } from './defaults'
import { changeObjectIntoCopy } from '../utilities/codeUtilities'

const resetState = state => {
    changeObjectIntoCopy({
        objectToChange: state,
        objectWithProperties: DEFAULT_STATE
    })
}

export default resetState
