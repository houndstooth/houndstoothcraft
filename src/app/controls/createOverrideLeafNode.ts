import { from } from '../../utilities'
import { appState } from '../appState'
import { FullSettingPath, SettingStep } from '../settings'
import { OverrideParentNode } from './types'

const createOverrideLeafNode: (_: FullSettingPath) => void =
	({ patternName, settingName, settingPath }: FullSettingPath): void => {
		// tslint:disable-next-line:max-line-length
		let overrideParentNode: OverrideParentNode = appState.controls.overrideNodes.children[ from.SettingStep(patternName) ] as OverrideParentNode

		settingPath.forEach((settingStep: SettingStep): void => {
			if (!overrideParentNode.children[ from.SettingStep(settingStep) ]) {
				overrideParentNode.children[ from.SettingStep(settingStep) ] = { open: false, children: {} }
			}
			overrideParentNode = overrideParentNode.children[ from.SettingStep(settingStep) ] as OverrideParentNode
		})

		overrideParentNode.children[ from.SettingStep(settingName) ] = { overriding: false }
	}

export default createOverrideLeafNode
