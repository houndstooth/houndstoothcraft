import { globalWrapper } from '../../utilities'
import {
	getOverrideParentNode,
	isParentOfAnyOverridingChildren,
	OverrideParentNode,
	toggleOverrideParentOpen,
} from '../controls'
import { FullSettingPath } from '../settings'
import appendOverride from './appendOverride'
import createOverrideId from './createOverrideId'
import createOverrideText from './createOverrideText'
import { CreateOverrideParams } from './types'

const createOverrideParent: (_: CreateOverrideParams) => void =
	({ settingName, settingPath, options, patternName }: CreateOverrideParams): void => {
		const overrideParent: HTMLDetailsElement = globalWrapper.document.createElement('details') as HTMLDetailsElement
		overrideParent.open = isOverrideParentOpen({ settingName, settingPath, patternName })

		const overrideParentName: HTMLElement = createOverrideParentName({ patternName, settingName, settingPath })
		overrideParent.appendChild(overrideParentName)

		appendOverride({ options, override: overrideParent, settingPath })
	}

const createOverrideParentName: (_: FullSettingPath) => HTMLElement =
	(fullSettingPath: FullSettingPath): HTMLElement => {
		const overrideParentName: HTMLElement = globalWrapper.document.createElement('summary')

		overrideParentName.innerHTML = createOverrideText({ ...fullSettingPath, maybeMark })
		overrideParentName.onclick = toggleOverrideParentOpen.default
		overrideParentName.id = createOverrideId(fullSettingPath)

		return overrideParentName
	}

const isOverrideParentOpen: (_: FullSettingPath) => boolean =
	(fullSettingPath: FullSettingPath): boolean => {
		const overrideParent: OverrideParentNode = getOverrideParentNode.default(fullSettingPath)

		return overrideParent.open
	}

const maybeMark: (_: FullSettingPath) => string =
	(fullSettingPath: FullSettingPath): string => {
		const overrideParent: OverrideParentNode = getOverrideParentNode.default(fullSettingPath)

		return isParentOfAnyOverridingChildren.default(overrideParent) ? ' *' : ''
	}

export default createOverrideParent
