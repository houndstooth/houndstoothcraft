import codeUtilities from '../../src/utilities/codeUtilities'
import store from '../../store'
import houndstoothDefaults from '../../src/store/houndstoothDefaults'

export default settingsPath => {
	let childSetting = store.mainHoundstooth.basePattern
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
			objectWithProperties: store.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
	}
	else {
		setting = codeUtilities.accessChildPropertyOrCreatePath({
			objectWithProperties: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern,
			propertyPath: settingsPath,
		})
	}
	return setting
}
