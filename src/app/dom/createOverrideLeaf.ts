// tslint:disable:no-any no-unsafe-any

import { codeUtilities, from, globalWrapper, to } from '../../utilities'
import { appState } from '../appState'
import { overrideHandler } from '../controls'
import { SettingPath, SettingStep } from '../settings'
import appendOverrideNode from './appendOverrideNode'
import formatSetting from './formatSetting'
import { CreateOverrideParams } from './types'

const createOverrideLeaf: (_: CreateOverrideParams) => void =
	({ settingName, settingPath, options }: CreateOverrideParams): void => {
		const overrideNode: HTMLElement = globalWrapper.document.createElement('div')

		const overrideName: HTMLElement = globalWrapper.document.createElement('span')
		overrideName.innerHTML = from.SettingStep(settingName)
		overrideNode.appendChild(overrideName)

		appendOverrideNode({ options, overrideNode, settingPath })

		const overrideInput: HTMLInputElement = globalWrapper.document.createElement('input')

		let settingValue: any = appState.settings.mainHoundstooth[ options.patternName ]
		const fullSettingPath: SettingPath = to.SettingPath(settingPath.concat(to.SettingPath([ settingName ])))
		fullSettingPath.forEach((settingStep: SettingStep): void => {
			settingValue = hasChild(settingValue, settingStep) ? settingValue[ from.SettingStep(settingStep) ] : undefined
		})
		overrideInput.value = formatSetting(settingValue)
		overrideInput.id = [ options.patternName ].concat(from.SettingPath(fullSettingPath)).join('-')

		overrideInput.onchange = overrideHandler.default

		overrideNode.appendChild(overrideInput)
	}

const hasChild: (_: any, __: SettingStep) => boolean =
	(setting: any, settingName: SettingStep): boolean =>
		setting && codeUtilities.isDefined(setting[ from.SettingStep(settingName) ])

export default createOverrideLeaf
