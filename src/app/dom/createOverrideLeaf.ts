// tslint:disable:no-any no-unsafe-any

import { globalWrapper } from '../../utilities'
import { appState } from '../appState'
import { getOverrideLeafNode, overrideInputChangeHandler } from '../controls'
import { concatFullSettingPath, FullSettingPath, getEffectSetting } from '../settings'
import appendOverride from './appendOverride'
import createOverrideId from './createOverrideId'
import createOverrideText from './createOverrideText'
import formatSetting from './formatSetting'
import { CreateOverrideParams } from './types'

const createOverrideLeaf: (_: CreateOverrideParams) => void =
	({ settingName, settingPath, options, patternName }: CreateOverrideParams): void => {
		const overrideLeaf: HTMLElement = globalWrapper.document.createElement('div')

		const overrideLeafName: HTMLElement = createOverrideLeafName({ settingName, settingPath, patternName })
		overrideLeaf.appendChild(overrideLeafName)

		const overrideLeafInput: HTMLInputElement = createOverrideLeafInput({ patternName, settingName, settingPath })
		overrideLeaf.appendChild(overrideLeafInput)

		appendOverride({ options, override: overrideLeaf, settingPath })
	}

const createOverrideLeafName: (_: FullSettingPath) => HTMLElement =
	(fullSettingPath: FullSettingPath): HTMLElement => {
		const overrideLeafName: HTMLElement = globalWrapper.document.createElement('span')

		overrideLeafName.innerHTML = createOverrideText({ ...fullSettingPath, maybeMark })

		return overrideLeafName
	}

const createOverrideLeafInput: (_: FullSettingPath) => HTMLInputElement =
	(fullSettingPath: FullSettingPath): HTMLInputElement => {
		const overrideLeafInput: HTMLInputElement = globalWrapper.document.createElement('input')

		overrideLeafInput.id = createOverrideId(fullSettingPath)
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

const maybeMark: (_: FullSettingPath) => string =
	(fullSettingPath: FullSettingPath): string =>
		getOverrideLeafNode.default(fullSettingPath).overriding ? ' *' : ''

export default createOverrideLeaf
