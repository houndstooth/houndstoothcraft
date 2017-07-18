import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import registeredSettings from '../registeredSettings'

const SETTINGS_OBJECT_NAMES = [ 'initial', 'animations', 'iterations' ]

const prepareFunctionsPerSettingsProperty = ({ objectWithFunctions, nestedPropertyPath = [], functionsArray = [] }) => {
	Object.entries(objectWithFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, nestedPropertyPath, propertyName: key })
		}
		else if (typeof value === 'object' && !(value instanceof Array)) {
			prepareFunctionsPerSettingsProperty({
				objectWithFunctions: value,
				nestedPropertyPath: codeUtilities.deeperPath({ nestedPropertyPath, propertyName: key }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`This object is supposed to be an object whose structure matches that of the initial settings, and whose leaf values are functions to be applied to those settings on each animation / iteration frame. However, you have provided a non-function ${value} at path ${nestedPropertyPath} ${key}`)
		}
	})
	return functionsArray
}

const applyOverrides = ({ objectWithPropertiesToBeOverridden, objectWithPropertyOverrides, nestedPropertyPath = [], settingsRegisteredCheck = registeredSettings }) => {
	if (!objectWithPropertyOverrides) return
	Object.entries(objectWithPropertyOverrides).forEach(([ propertyName, overridingProperty ]) => {
		let deeperSettingsRegisteredCheck
		if (codeUtilities.propertyIsDefinedOnObject({ propertyName, objectMaybeWithProperty: settingsRegisteredCheck })) {
			deeperSettingsRegisteredCheck = settingsRegisteredCheck[propertyName]
		}
		else {
			consoleWrapper.error(`Attempt to apply unknown settings: ${nestedPropertyPath.join('.')}.${propertyName}`)
			return
		}

		if (overridingProperty && typeof overridingProperty === 'object' && !overridingProperty.length) {
			applyOverrides({
				objectWithPropertiesToBeOverridden,
				objectWithPropertyOverrides: overridingProperty,
				nestedPropertyPath: codeUtilities.deeperPath({ nestedPropertyPath, propertyName }),
				settingsRegisteredCheck: deeperSettingsRegisteredCheck,
			})
		}
		else {
			let objectWithPropertyToBeOverridden = codeUtilities.accessChildObjectOrCreatePath({
				parentObject: objectWithPropertiesToBeOverridden,
				nestedPropertyPath,
			})
			objectWithPropertyToBeOverridden[ propertyName ] = overridingProperty
		}
	})
}

const getFromSettingsOrDefault = ({ nestedPropertyPath, defaultForProperty, customObject }) => {
	let property
	const parentObject = customObject || current.settings
	let childObject = parentObject
	let notThere
	nestedPropertyPath.forEach(pathStep => {
		if (notThere) return
		if (!codeUtilities.isDefined(childObject[ pathStep ])) {
			childObject = undefined
			notThere = true
			return
		}
		childObject = childObject[ pathStep ]
	})

	if (codeUtilities.isDefined(childObject)) {
		property = codeUtilities.accessChildObjectOrCreatePath({ parentObject, nestedPropertyPath })
	}
	else {
		property = defaultForProperty
	}
	return property
}

const confirmSettingsObjectsParentIncludesOnlySettingsObjects = (settingsObjectParent) => {
	return Object.keys(settingsObjectParent).every(key => {
		if (!SETTINGS_OBJECT_NAMES.includes(key)) {
			consoleWrapper.error(`Unknown settings object: ${key}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSettingsProperty,
	applyOverrides,
	getFromSettingsOrDefault,
	confirmSettingsObjectsParentIncludesOnlySettingsObjects,
}
