import { from } from '../../../utilities'
import { appState } from '../../appState'
import { concatFullSettingPath, FullSettingPath, SettingPath, SettingStep } from '../../setting'
import { OverrideParentNode } from './types'

const getOverrideParentNode: (_: FullSettingPath) => OverrideParentNode =
	(fullSettingPath: FullSettingPath): OverrideParentNode => {
		let overrideNode: OverrideParentNode = appState.controls.overrideNodes
		const concatenatedFullSettingPath: SettingPath = concatFullSettingPath.default(fullSettingPath)
		concatenatedFullSettingPath.forEach((settingStep: SettingStep): void => {
			overrideNode = overrideNode.children[ from.SettingStep(settingStep) ] as OverrideParentNode
		})

		return overrideNode
	}

export default getOverrideParentNode
