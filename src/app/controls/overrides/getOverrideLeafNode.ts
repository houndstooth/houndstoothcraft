import { from } from '../../../utilities'
import { appState } from '../../appState'
import { FullSettingPath, SettingStep } from '../../settings'
import { OverrideLeafNode, OverrideParentNode } from './types'

const getOverrideLeafNode: (_: FullSettingPath) => OverrideLeafNode =
	({ settingName, settingPath, patternName }: FullSettingPath): OverrideLeafNode => {
		// tslint:disable-next-line:max-line-length
		let overrideParentNode: OverrideParentNode = appState.controls.overrideNodes.children[ from.SettingStep(patternName) ] as OverrideParentNode
		settingPath.forEach((settingStep: SettingStep): void => {
			overrideParentNode = overrideParentNode.children[ from.SettingStep(settingStep) ] as OverrideParentNode
		})

		return overrideParentNode.children[ from.SettingStep(settingName) ] as OverrideLeafNode
	}

export default getOverrideLeafNode
