import consoleWrapper from '../application/consoleWrapper'

const resetObject = ({ objectToReset, objectToResetTo }) => {
	Object.keys(objectToResetTo).forEach(key => objectToReset[ key ] = objectToResetTo[ key ])
}

const deeperPath = ({ nestedPropertyPath, propertyName }) => {
	const deeperPath = nestedPropertyPath.slice()
	deeperPath.push(propertyName)
	return deeperPath
}

const accessChildObjectOrCreatePath = ({ parentObject, nestedPropertyPath }) => {
	let childObject = parentObject
	nestedPropertyPath.forEach(pathStep => {
		if (!childObject[ pathStep ]) childObject[ pathStep ] = {}
		childObject = childObject[ pathStep ]
	})
	return childObject
}

const prepareFunctionsPerSettingsProperty = ({ objectWithFunctions, nestedPropertyPath = [], functionsArray = [] }) => {
	Object.entries(objectWithFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, nestedPropertyPath, propertyName: key })
		} else if (typeof value === 'object' && !(value instanceof Array)) {
			prepareFunctionsPerSettingsProperty({
				objectWithFunctions: value,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName: key }),
				functionsArray
			})
		} else {
			consoleWrapper.warn(`This object is supposed to be an object whose structure matches that of the initial settings, and whose leaf values are functions to be applied to those settings on each animation / iteration frame. However, you have provided a non-function ${value} at path ${nestedPropertyPath} ${key}`)
		}
	})
	return functionsArray
}

const applyOverrides = ({ objectWithPropertiesToOverride, overrides, nestedPropertyPath = [] }) => {
	overrides && Object.entries(overrides).forEach(([ propertyName, overridingProperty ]) => {
		if (overridingProperty && typeof overridingProperty === 'object' && !overridingProperty.length) {
			applyOverrides({
				objectWithPropertiesToOverride,
				overrides: overridingProperty,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName })
			})
		} else {
			let objectWithPropertyToOverride = accessChildObjectOrCreatePath({
				parentObject: objectWithPropertiesToOverride,
				nestedPropertyPath
			})
			objectWithPropertyToOverride[ propertyName ] = overridingProperty
		}
	})
}

const deepClone = objectToClone => {
	let clonedObject = {}
	Object.entries(objectToClone).forEach(([ key, value ]) => {
		if (value instanceof Array) {
			clonedObject[key] = value.slice()
		} else if (typeof value === 'object') {
			clonedObject[key] = deepClone(value)
		} else {
			clonedObject[key] = value
		}
	})
	return clonedObject
}

export default {
	resetObject,
	deeperPath,
	accessChildObjectOrCreatePath,
	prepareFunctionsPerSettingsProperty,
	applyOverrides,
	deepClone
}
