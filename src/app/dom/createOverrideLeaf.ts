// tslint:disable:no-any no-unsafe-any

import { from, globalWrapper } from '../../utilities'
import { appState } from '../appState'
import { getOverrideLeafNode, overrideInputChangeHandler } from '../controls'
import { concatFullSettingPath, FullSettingPath, getEffectSetting, SettingStep } from '../settings'
import appendOverride from './appendOverride'
import createOverrideClear from './createOverrideClear'
import createOverrideId from './createOverrideId'
import formatSetting from './formatSetting'
import { CreateOverrideParams } from './types'

const createOverrideLeaf: (_: CreateOverrideParams) => void =
	({ settingName, settingPath, options, patternName }: CreateOverrideParams): void => {
		const overrideLeaf: HTMLElement = globalWrapper.document.createElement('div')

		const overrideLeafName: HTMLElement = createOverrideLeafName(settingName)
		overrideLeaf.appendChild(overrideLeafName)

		const overrideLeafInput: HTMLInputElement = createOverrideLeafInput({ patternName, settingName, settingPath })
		overrideLeaf.appendChild(overrideLeafInput)

		if (thisOverrideIsActivelyOverriding({ settingName, settingPath, patternName })) {
			const overrideLeafClear: HTMLButtonElement = createOverrideClear()
			overrideLeaf.appendChild(overrideLeafClear)
		}

		overrideLeaf.id = createOverrideId({ settingName, settingPath, patternName })

		appendOverride({ options, override: overrideLeaf, settingPath })
	}

const createOverrideLeafName: (_: SettingStep) => HTMLElement =
	(settingName: SettingStep): HTMLElement => {
		const overrideLeafName: HTMLElement = globalWrapper.document.createElement('span')
		overrideLeafName.innerHTML = from.SettingStep(settingName)

		return overrideLeafName
	}

const createOverrideLeafInput: (_: FullSettingPath) => HTMLInputElement =
	(fullSettingPath: FullSettingPath): HTMLInputElement => {
		const overrideLeafInput: HTMLInputElement = globalWrapper.document.createElement('input')

		overrideLeafInput.value = createOverrideLeafInputValue(fullSettingPath)
		overrideLeafInput.onchange = overrideInputChangeHandler.default

		return overrideLeafInput
	}

const createOverrideLeafInputValue: (_: FullSettingPath) => string =
	(fullSettingPath: FullSettingPath): string => {
		const settingValue: any = getEffectSetting.default({
			concatenatedFullSettingPath: concatFullSettingPath.default(fullSettingPath),
			effect: appState.settings.mainHoundstooth,
		})

		return formatSetting(settingValue)
	}

const thisOverrideIsActivelyOverriding: (_: FullSettingPath) => boolean =
	(fullSettingPath: FullSettingPath): boolean =>
		getOverrideLeafNode.default(fullSettingPath).overriding

export default createOverrideLeaf
