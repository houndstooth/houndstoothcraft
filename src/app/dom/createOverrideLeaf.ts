// tslint:disable:no-any no-unsafe-any

import { codeUtilities, from, globalWrapper } from '../../utilities'
import { appState } from '../appState'
import { overrideInputChangeHandler } from '../controls'
import { concatFullSettingPath, FullSettingPath, SettingStep } from '../settings'
import appendOverride from './appendOverride'
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

		overrideLeafInput.id = createOverrideId(fullSettingPath)
		overrideLeafInput.value = createOverrideLeafInputValue(fullSettingPath)
		overrideLeafInput.onchange = overrideInputChangeHandler.default

		return overrideLeafInput
	}

const createOverrideLeafInputValue: (_: FullSettingPath) => string =
	(fullSettingPath: FullSettingPath): string => {
		let settingValue: any = appState.settings.mainHoundstooth
		concatFullSettingPath.default(fullSettingPath).forEach((settingStep: SettingStep): void => {
			settingValue = hasChild(settingValue, settingStep) ? settingValue[ from.SettingStep(settingStep) ] : undefined
		})

		return formatSetting(settingValue)
	}

const hasChild: (_: any, __: SettingStep) => boolean =
	(setting: any, settingName: SettingStep): boolean =>
		setting && codeUtilities.isDefined(setting[ from.SettingStep(settingName) ])

export default createOverrideLeaf
