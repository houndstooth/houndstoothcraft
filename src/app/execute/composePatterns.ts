// tslint:disable:no-any no-unsafe-any

import { Color } from '../../pattern'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { deeperPath, getPatternSettingOrCreatePath } from '../store'
import { maybeWarnAboutConflicts } from '../ui'
import { ComposePatternsParams } from './types'

const composePatterns: (_: ComposePatternsParams) => void =
	(params: ComposePatternsParams): void => {
		const {
			patternToBeMergedOnto,
			patternToMerge = {},
			settingsPath = to.SettingsPath([]),
			warnAboutConflicts = false,
		}: ComposePatternsParams = params

		Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]: [ string, any ]) => {
			if (shouldRecurse({ overridingSetting })) {
				composePatterns({
					patternToBeMergedOnto,
					patternToMerge: overridingSetting,
					settingsPath: deeperPath.default({ settingsPath, settingName: to.SettingsStep(settingName) }),
					warnAboutConflicts,
				})
			}
			else {
				const settingsWithSettingToBeOverridden: { [_: string]: any } = getPatternSettingOrCreatePath.default({
					pattern: patternToBeMergedOnto,
					settingsPath,
				})

				const existingSetting: any = settingsWithSettingToBeOverridden[ settingName ]

				maybeWarnAboutConflicts.default({
					existingSetting,
					overridingSetting,
					settingName: to.SettingsStep(settingName),
					settingsPath,
					warnAboutConflicts,
				})

				settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
			}
		})
	}

const shouldRecurse: (_: { overridingSetting: any }) => boolean =
	({ overridingSetting }: { overridingSetting: any }): boolean =>
		settingIsNonArrayObject(overridingSetting) && settingIsNotColor(overridingSetting)

const settingIsNonArrayObject: (setting: any) => boolean =
	(setting: any): boolean => {
		if (!setting) {
			return false
		}
		if (typeof setting !== 'object') {
			return false
		}

		return !(setting instanceof Array)
	}

const settingIsNotColor: (setting: any) => boolean =
	(setting: any): boolean => {
		const { r, g, b, a }: Color = setting

		// tslint:disable-next-line:max-line-length
		return !(codeUtilities.isDefined(r) || codeUtilities.isDefined(g) || codeUtilities.isDefined(b) || codeUtilities.isDefined(a))
	}

export default composePatterns
