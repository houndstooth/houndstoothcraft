const iterator = (iterations, options = { oneIndexed: false }) => {
	let iterator = [ ...Array(Math.ceil(iterations)).keys() ]
	if (options.oneIndexed) iterator = iterator.map(k => k + 1)
	return iterator
}

const wrappedIndex = ({ array, index = 0 }) => {
	let i
	if (index < 0) {
		i = array.length - (Math.abs(index) % array.length)
		if (i === array.length) i = 0
	}
	else {
		i = index % array.length
	}
	return array[ i ]
}

const shallowEqual = (a, b) => {
	const sameKeyCount = Object.keys(a).length === Object.keys(b).length
	return sameKeyCount && Object.entries(a).every(([ key, value ]) => value === b[ key ])
}

const deepClone = settingsToClone => {
	let clonedSettings = {}
	Object.entries(settingsToClone).forEach(([ settingName, setting ]) => {
		if (setting instanceof Array) {
			clonedSettings[ settingName ] = setting.slice()
		}
		else if (setting && typeof setting === 'object') {
			clonedSettings[ settingName ] = deepClone(setting)
		}
		else {
			clonedSettings[ settingName ] = setting
		}
	})
	return clonedSettings
}

const resetSettings = ({ settingsToReset, settingsToResetTo }) => {
	Object.keys(settingsToResetTo).forEach(key => settingsToReset[ key ] = settingsToResetTo[ key ])
}

const deeperPath = ({ settingsPath, settingName }) => {
	const deeperPath = settingsPath.slice()
	deeperPath.push(settingName)
	return deeperPath
}

const accessChildSettingOrCreatePath = ({ settingsRoot, settingsPath }) => {
	let childSetting = settingsRoot
	settingsPath.forEach(pathStep => {
		if (!isDefined(childSetting[ pathStep ])) childSetting[ pathStep ] = {}
		childSetting = childSetting[ pathStep ]
	})
	return childSetting
}

const defaultToTrue = setting => isDefined(setting) ? setting : true

const isDefined = setting => typeof setting !== 'undefined'

const settingIsDefinedOnSettings = ({ settingName, settingsMaybeWithSetting }) => {
	return isDefined(settingsMaybeWithSetting[ settingName ])
}

export default {
	iterator,
	wrappedIndex,
	shallowEqual,
	deepClone,
	resetSettings,
	deeperPath,
	accessChildSettingOrCreatePath,
	defaultToTrue,
	isDefined,
	settingIsDefinedOnSettings,
}
