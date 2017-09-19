import { accessChildPropertyOrCreatePath, isDefined } from '../../src/utilities/codeUtilities'
import state from '../../state'
import { HOUNDSTOOTH_DEFAULTS } from '../../src/store/houndstoothDefaults'

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
			objectWithProperties: HOUNDSTOOTH_DEFAULTS.basePattern,
			propertyPath: settingsPath,
		})
	}
	return setting
}
