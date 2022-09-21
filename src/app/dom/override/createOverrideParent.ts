import { from, globalWrapper } from '../../../utilities'
import {
	getOverrideParentNode,
	isParentOfAnyOverridingChildren,
	OverrideParentNode,
	toggleOverrideParentOpen,
} from '../../controls'
import { FullSettingPath, SettingStep } from '../../setting'

import appendOverride from './appendOverride'
import createOverrideClear from './createOverrideClear'
import createOverrideId from './createOverrideId'
import { CreateOverrideParams } from './types'

const createOverrideParent: (_: CreateOverrideParams) => void =
	({ settingName, settingPath, options, patternName }: CreateOverrideParams): void => {
		const overrideParent: HTMLDetailsElement = globalWrapper.document.createElement('details')
		overrideParent.open = isOverrideParentOpen({ settingName, settingPath, patternName })

		const overrideParentSummary: HTMLElement = createOverrideParentSummary({
			patternName,
			settingName,
			settingPath,
		})
		overrideParent.appendChild(overrideParentSummary)

		appendOverride({ options, override: overrideParent, settingPath })
	}

const createOverrideParentSummary: (_: FullSettingPath) => HTMLElement =
	({ settingName, settingPath, patternName }: FullSettingPath): HTMLElement => {
		const overrideParentSummary: HTMLElement = globalWrapper.document.createElement('summary')

		const overrideParentName: HTMLElement = createOverrideParentName(settingName)
		overrideParentSummary.appendChild(overrideParentName)

		if (thisOverrideIsActivelyOverriding({ settingName, settingPath, patternName })) {
			overrideParentSummary.appendChild(createOverrideClear())
		}

		overrideParentSummary.onclick = toggleOverrideParentOpen.default
		overrideParentSummary.id = createOverrideId({ settingName, settingPath, patternName })

		return overrideParentSummary
	}

const createOverrideParentName: (_: SettingStep) => HTMLElement =
	(settingName: SettingStep): HTMLElement => {
		const overrideParentName: HTMLElement = globalWrapper.document.createElement('span')
		overrideParentName.innerHTML = from.SettingStep(settingName)

		return overrideParentName
	}

const isOverrideParentOpen: (_: FullSettingPath) => boolean =
	(fullSettingPath: FullSettingPath): boolean => {
		const overrideParent: OverrideParentNode = getOverrideParentNode.default(fullSettingPath)

		return overrideParent.open
	}

const thisOverrideIsActivelyOverriding: (_: FullSettingPath) => string =
	(fullSettingPath: FullSettingPath): string => {
		const overrideParent: OverrideParentNode = getOverrideParentNode.default(fullSettingPath)

		return isParentOfAnyOverridingChildren.default(overrideParent) ? ' *' : ''
	}

export default createOverrideParent
