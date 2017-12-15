// tslint:disable:no-any no-unsafe-any

import { codeUtilities, from, globalWrapper } from '../../utilities'
import { appState } from '../appState'
import { overrideHandler } from '../controls'
import appendOverrideNode from './appendOverrideNode'
import formatSetting from './formatSetting'
import { CreateOverrideParams } from './types'

const createOverrideLeaf: (_: CreateOverrideParams) => void =
	({ settingName, settingsPath, options }: CreateOverrideParams): void => {
		const overrideNode: HTMLElement = globalWrapper.document.createElement('div')

		const overrideName: HTMLElement = globalWrapper.document.createElement('span')
		overrideName.innerHTML = settingName
		overrideNode.appendChild(overrideName)

		appendOverrideNode({ options, overrideNode, settingsPath })

		const overrideInput: HTMLInputElement = globalWrapper.document.createElement('input')

		let settingValue: any = appState.settings.mainHoundstooth[ options.patternName ]
		const fullSettingsPathNames: string[] = from.SettingsPath(settingsPath).concat([ settingName ])
		fullSettingsPathNames.forEach((settingStepName: string): void => {
			settingValue = hasChild(settingValue, settingStepName) ? settingValue[ settingStepName ] : undefined
		})
		overrideInput.value = formatSetting(settingValue)
		overrideInput.id = [ options.patternName ].concat(fullSettingsPathNames).join('-')

		overrideInput.onchange = overrideHandler.default

		overrideNode.appendChild(overrideInput)
	}

const hasChild: (_: any, __: string) => boolean =
	(setting: any, settingName: string): boolean =>
		setting && codeUtilities.isDefined(setting[ settingName ])

export default createOverrideLeaf
