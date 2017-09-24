import { accessChildPropertyOrCreatePath, isDefined } from '../../src/utilities/codeUtilities'
import state from '../../state'
import { DEFAULT_PATTERN } from '../../src/store/defaults'

export default settingsPath => {
	let childSetting = state.mainHoundstooth.basePattern
	let notThere
	settingsPath.forEach(pathStep => {
		if (notThere) return
		if (!isDefined(childSetting[ pathStep ])) {
			childSetting = undefined
			notThere = true
			return
		}
		childSetting = childSetting[ pathStep ]
	})

	let setting
	if (isDefined(childSetting)) {
		setting = accessChildPropertyOrCreatePath({
			objectWithProperties: state.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
	}
	else {
		setting = accessChildPropertyOrCreatePath({
			objectWithProperties: DEFAULT_PATTERN,
			propertyPath: settingsPath,
		})
	}
	return setting
}
