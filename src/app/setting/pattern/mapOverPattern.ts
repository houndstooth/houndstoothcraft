// tslint:disable:no-any no-unsafe-any

import { Color } from '../../../types'
import { codeUtilities, to } from '../../../utilities'
import { DEFAULT_BASE_PATTERN } from '../defaults'
import { SettingStep } from '../types'
import deeperPath from './deeperPath'
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

const shouldRecurse: (_: any) => boolean =
	(setting: any): boolean =>
		settingIsNonArrayObject(setting) && settingIsNotColor(setting)

const settingIsNonArrayObject: (_: any) => boolean =
	(setting: any): boolean => {
		if (!setting) {
			return false
		}
		if (typeof setting !== 'object') {
			return false
		}

		return !(setting instanceof Array)
	}

const settingIsNotColor: (_: any) => boolean =
	(setting: any): boolean => {
		// tslint:disable-next-line:no-unsafe-any
		const { r, g, b, a }: Color = setting

		return !(codeUtilities.isDefined(r) ||
			codeUtilities.isDefined(g) ||
			codeUtilities.isDefined(b) ||
			codeUtilities.isDefined(a))
	}

export default mapOverPattern
