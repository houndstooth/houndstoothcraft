import codeUtilities from '../../src/utilities/codeUtilities'
import state from '../../state'
import { HOUNDSTOOTH_DEFAULTS } from '../../src/store/houndstoothDefaults'

export default settingsPath => {
	let childSetting = state.mainHoundstooth.basePattern
	let notThere
	settingsPath.forEach(pathStep => {
		if (notThere) return
		if (!codeUtilities.isDefined(childSetting[ pathStep ])) {
			childSetting = undefined
			notThere = true
			return
		}
		childSetting = childSetting[ pathStep ]
	})

	let setting
	if (codeUtilities.isDefined(childSetting)) {
		setting = codeUtilities.accessChildPropertyOrCreatePath({
			objectWithProperties: state.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
	}
	else {
		setting = codeUtilities.accessChildPropertyOrCreatePath({
			objectWithProperties: HOUNDSTOOTH_DEFAULTS.basePattern,
			propertyPath: settingsPath,
		})
	}
	return setting
}
