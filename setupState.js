import state from './state'
import defaultState from './defaultState'
import overrideState from './overrideState'
import resetState from './resetState'

const prepareState = ({ stateOverridesObject, nestedPropertyPath }) => {
	Object.entries(stateOverridesObject).forEach(([ propertyName, stateOverrideProperty ]) => {
		if (typeof stateOverrideProperty === 'object') {
			const deeperPath = nestedPropertyPath.slice()
			deeperPath.push(propertyName)
			prepareState({ stateOverridesObject: stateOverrideProperty, nestedPropertyPath: deeperPath })
		} else {
			let stateObjectWithPropertyNeedingToBeOverridden = state
			nestedPropertyPath.forEach(pathStep => {
				stateObjectWithPropertyNeedingToBeOverridden = stateObjectWithPropertyNeedingToBeOverridden[ pathStep ]
			})
			stateObjectWithPropertyNeedingToBeOverridden[ propertyName ] = stateOverrideProperty
		}
	})
}

export default () => {
	resetState({ objectToResetStateTo: defaultState })
	prepareState({ stateOverridesObject: overrideState, nestedPropertyPath: [] })
}
