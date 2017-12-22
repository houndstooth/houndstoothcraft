// tslint:disable:no-any

import { to } from '../../../utilities'
import { DEFAULT_BASE_PATTERN } from '../defaults'
import { SettingStep } from '../types'
import deeperPath from './deeperPath'
import shouldRecurse from './shouldRecurse'
import { DeepSettingsMapParams, MapOverPatternParams } from './types'

const mapOverPattern: (_?: MapOverPatternParams) => boolean =
	(mapOverPatternParams: MapOverPatternParams = {}): boolean => {
		const {
			options,
			pattern = DEFAULT_BASE_PATTERN,
			patternName = to.SettingStep('basePattern'),
			perParent,
			perLeaf,
		}: MapOverPatternParams = mapOverPatternParams

		const deepSettingsMap: (_: DeepSettingsMapParams) => boolean =
			({ settings, settingPath }: DeepSettingsMapParams): boolean =>
				Object.entries(settings).some(([ settingNameString, settingValue ]: [ string, any ]): boolean => {
					const settingName: SettingStep = to.SettingStep(settingNameString)
					if (shouldRecurse(settingValue)) {
						if (perParent) {
							perParent({ options, patternName, settingName, settingValue, settingPath })
						}

						return deepSettingsMap({
							settingPath: deeperPath({ settingName, settingPath }),
							// tslint:disable-next-line:no-unsafe-any
							settings: settings[ settingNameString ],
						})
					}
					else if (perLeaf) {
						return !!(perLeaf({ options, patternName, settingName, settingPath, settingValue }))
					}

					return false
				})

		return deepSettingsMap({ settings: pattern, settingPath: to.SettingPath([]) })
	}

export default mapOverPattern
