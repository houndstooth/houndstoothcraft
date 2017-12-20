// tslint:disable:no-any

import { codeUtilities } from '../../../utilities'
import { appState } from '../../appState'
import { concatFullSettingPath, FullSettingPath, getEffectSetting, SettingPath } from '../../settings'
// tslint:disable-next-line:no-reaching-imports
import { DEFAULT_MAIN_HOUNDSTOOTH } from '../../settings/defaults'
import getOverrideLeafNode from './getOverrideLeafNode'
import { OverrideLeafNode } from './types'

const updateOverrideLeafNode: (_: FullSettingPath) => void =
	(fullSettingPath: FullSettingPath): void => {
		const overrideLeafNode: OverrideLeafNode = getOverrideLeafNode(fullSettingPath)
		overrideLeafNode.overriding = !matchesWhateverWeCallCombinedEffectsComposedWithDefaults(fullSettingPath)
	}

const matchesWhateverWeCallCombinedEffectsComposedWithDefaults: (_: FullSettingPath) => boolean =
	(fullSettingPath: FullSettingPath): boolean => {
		const concatenatedFullSettingPath: SettingPath = concatFullSettingPath.default(fullSettingPath)

		const overridingValue: any = getEffectSetting.default({
			concatenatedFullSettingPath,
			effect: appState.settings.overrides,
		})
		if (!overridingValue) {
			return true
		}

		const underlyingValue: any = getEffectSetting.default({
			concatenatedFullSettingPath,
			effect: appState.settings.combinedEffects,
		}) || getEffectSetting.default({
			concatenatedFullSettingPath,
			effect: DEFAULT_MAIN_HOUNDSTOOTH,
		})

		return codeUtilities.deepEqual(overridingValue, underlyingValue)
	}

export default updateOverrideLeafNode
