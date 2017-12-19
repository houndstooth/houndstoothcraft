import { to } from '../../utilities'
import deeperPath from './deeperPath'
import { DEFAULT_BASE_PATTERN } from './defaults'
import shouldRecurse from './shouldRecurse'
import { DeepSettingsMapParams, MapOverPatternParams, SettingStep } from './types'

const mapOverPattern: (_?: MapOverPatternParams) => void =
	(mapOverPatternParams: MapOverPatternParams = {}): void => {
		const {
			options,
			pattern = DEFAULT_BASE_PATTERN,
			patternName = to.SettingStep('basePattern'),
			perParent,
			perLeaf,
		}: MapOverPatternParams = mapOverPatternParams

		const deepSettingsMap: (_: DeepSettingsMapParams) => void =
			({ settings, settingPath }: DeepSettingsMapParams): void => {
				// tslint:disable-next-line:no-any
				Object.entries(settings).forEach(([ settingNameString, settingValue ]: [ string, any ]) => {
					const settingName: SettingStep = to.SettingStep(settingNameString)
					if (shouldRecurse(settingValue)) {
						if (perParent) {
							perParent({ options, patternName, settingName, settingValue, settingPath })
						}
						deepSettingsMap({
							settingPath: deeperPath({ settingName, settingPath }),
							// tslint:disable-next-line:no-unsafe-any
							settings: settings[ settingNameString ],
						})
					}
					else if (perLeaf) {
						perLeaf({ options, patternName, settingName, settingPath, settingValue })
					}
				})
			}

		deepSettingsMap({ settings: pattern, settingPath: to.SettingPath([]) })
	}

export default mapOverPattern
