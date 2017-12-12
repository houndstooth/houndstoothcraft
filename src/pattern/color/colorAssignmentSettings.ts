// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import { AssignmentMode, OffsetAddress, Supertile, TransformShapeColorIndices, Weave } from './types'

interface ColorAssignmentSettings {
	readonly assignmentMode: AssignmentMode,
	readonly flipGrain: boolean,
	readonly offsetAddress?: OffsetAddress,
	readonly supertile: Supertile,
	readonly switcheroo: boolean,
	readonly transformShapeColorIndices?: TransformShapeColorIndices,
	readonly weave: Weave,
	readonly [_: string]: any,
}

type ColorAssignmentSettingsFunctions = FunctionsOf<ColorAssignmentSettings>

type ColorAssignmentSettingsName = 'colorAssignmentSettings'

type ColorAssignmentSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	AssignmentModeTypedSettingsNames: 'assignmentMode',
	BooleanTypedSettingsNames: 'flipGrain' | 'switcheroo',
	OffsetAddressTypedSettingsNames: 'offsetAddress',
	SupertileTypedSettingsNames: 'supertile',
	TransformShapeColorIndicesTypedSettingsNames: 'transformShapeColorIndices',
	WeaveTypedSettingsNames: 'weave',
}>

export {
	ColorAssignmentSettings,
	ColorAssignmentSettingsFunctions,
	ColorAssignmentSettingsName,
	ColorAssignmentSettingsNamesByType,
}
