// tslint:disable:no-any

import { isDefined } from '../utilities/codeUtilities'
import { SettingsStep } from './types'

const getSettingOrCreatePath: (_: {
	settings: any, settingsPath: SettingsStep[],
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
