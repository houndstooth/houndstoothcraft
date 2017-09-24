import { INITIAL_STATE } from './initialState'
import { changeObjectIntoCopy } from '../utilities/codeUtilities'

const resetState = state => {
    changeObjectIntoCopy({ 
        objectToChange: state, 
        objectWithProperties: INITIAL_STATE 
    })
}

export default resetState
