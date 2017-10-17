import { accessChildPropertyOrCreatePath, isDefined } from '../../src/utilities/codeUtilities'
import state from '../../src/state'
import { DEFAULT_PATTERN } from '../../src/store/defaults'
import { Setting } from '../../src/store'
import { PropertyPath } from '../../src/utilities/types'

const getFromBasePatternOrDefault: { (settingsPath: PropertyPath): Setting } = settingsPath => {
	let childSetting = state.mainHoundstooth.basePattern

	for (const pathStep of settingsPath) {
		if (!isDefined(childSetting && childSetting[ pathStep ])) {
			return accessChildPropertyOrCreatePath({
				objectWithProperties: DEFAULT_PATTERN,
				propertyPath: settingsPath,
			})
		}
		childSetting = childSetting && childSetting[ pathStep ]
	}

	return accessChildPropertyOrCreatePath({
		objectWithProperties: state.mainHoundstooth.basePattern || {},
		propertyPath: settingsPath,
	})
}

export default getFromBasePatternOrDefault
