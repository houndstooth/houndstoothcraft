import defaultState from './defaultState'
import overrideState from './overrideState'
import resetState from './resetState'
import deeperPath from './deeperPath'
import accessStateObjectWithProperty from './accessStateObjectWithProperty'

const prepareState = ({ stateOverridesObject, nestedPropertyPath }) => {
	Object.entries(stateOverridesObject).forEach(([ propertyName, stateOverrideProperty ]) => {
		if (typeof stateOverrideProperty === 'object') {
			prepareState({
				stateOverridesObject: stateOverrideProperty,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName })
			})
		} else {
			let stateObjectWithProperty = accessStateObjectWithProperty({ nestedPropertyPath })
			stateObjectWithProperty[ propertyName ] = stateOverrideProperty
		}
	})
}

export default () => {
	resetState({ objectToResetStateTo: defaultState })
	prepareState({ stateOverridesObject: overrideState, nestedPropertyPath: [] })
}
