import { isDefined } from '../utilities/codeUtilities'
import { SettingsPath } from './types'

const getSettingOrCreatePath: (_: {
	settings: any, settingsPath: SettingsPath,
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
