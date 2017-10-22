import { SettingsPath } from './types'
import { isDefined } from '../utilities/codeUtilities'

const getSettingOrCreatePath: (_: {
	settings: object, settingsPath: SettingsPath,
}) => any = ({ settings, settingsPath }) => {
	let childSettings = settings
	settingsPath.forEach(settingsStep => {
		if (!isDefined(childSettings[ settingsStep ])) {
			childSettings[ settingsStep ] = {}
		}
		childSettings = childSettings[ settingsStep ]
	})

	return childSettings
}

export { getSettingOrCreatePath }
