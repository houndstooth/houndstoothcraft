import { to } from '../../utilities'
import deeperPath from './deeperPath'
import { DEFAULT_BASE_PATTERN } from './defaults'
import shouldRecurse from './shouldRecurse'
import { DeepSettingsMapParams, MapOverPatternParams } from './types'

const mapOverPattern: (_?: MapOverPatternParams) => void =
	({ options, pattern = DEFAULT_BASE_PATTERN, perParent, perLeaf }: MapOverPatternParams = {}): void => {
		const deepSettingsMap: (_: DeepSettingsMapParams) => void =
			({ settings, settingsPath }: DeepSettingsMapParams): void => {
				// tslint:disable-next-line:no-any
				Object.entries(settings).forEach(([ settingName, settingValue ]: [ string, any ]) => {
					if (shouldRecurse(settingValue)) {
						if (perParent) {
							perParent({ options, settingName, settingsPath, settingValue })
						}
						deepSettingsMap({
							// tslint:disable-next-line:no-unsafe-any
							settings: settings[ settingName ],
							settingsPath: deeperPath({
								settingName: to.SettingsStep(settingName),
								settingsPath,
							}),
						})
					}
					else if (perLeaf) {
						perLeaf({ options, settingName, settingsPath, settingValue })
					}
				})
			}

		deepSettingsMap({ settings: pattern, settingsPath: to.SettingsPath([]) })
	}

export default mapOverPattern
