// tslint:disable:no-magic-numbers max-file-line-count no-any

import { AssignmentMode, OffsetAddress, Supertile, TransformShapeColorIndices, Weave } from '../../../components'
import { FunctionsOf } from '../../../execute/types'
import * as to from '../../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../../types'

interface ColorAssignmentSettingsStructure {
	readonly assignmentMode: any,
	readonly flipGrain: any,
	readonly offsetAddress?: any,
	readonly supertile: any,
	readonly switcheroo: any,
	readonly transformShapeColorIndices?: any,
	readonly weave: any,
	readonly [_: string]: any,
}

interface ColorAssignmentSettings extends ColorAssignmentSettingsStructure {
	readonly assignmentMode: AssignmentMode,
	readonly flipGrain: boolean,
	readonly offsetAddress?: OffsetAddress,
	readonly supertile: Supertile,
	readonly switcheroo: boolean,
	readonly transformShapeColorIndices?: TransformShapeColorIndices,
	readonly weave: Weave,
}

type ColorAssignmentSettingsFunctions = FunctionsOf<ColorAssignmentSettings>

const DEFAULT_ASSIGNMENT_MODE: AssignmentMode = AssignmentMode.Weave
const DEFAULT_FLIP_GRAIN = false
const DEFAULT_OFFSET_ADDRESS: undefined = undefined
const DEFAULT_SUPERTILE: Supertile = to.Supertile([ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ])
const DEFAULT_SWITCHEROO = false
const DEFAULT_TRANSFORM_SHAPE_COLOR_INDICES: undefined = undefined
const DEFAULT_WEAVE: Weave = { rows: [ 1, 0 ], columns: [ 0, 1 ] }

const DEFAULT_COLOR_ASSIGNMENT_SETTINGS: ColorAssignmentSettings = {
	assignmentMode: DEFAULT_ASSIGNMENT_MODE,
	flipGrain: DEFAULT_FLIP_GRAIN,
	offsetAddress: DEFAULT_OFFSET_ADDRESS,
	supertile: DEFAULT_SUPERTILE,
	switcheroo: DEFAULT_SWITCHEROO,
	transformShapeColorIndices: DEFAULT_TRANSFORM_SHAPE_COLOR_INDICES,
	weave: DEFAULT_WEAVE,
}

type ColorAssignmentSettingsName = 'colorAssignmentSettings'

const colorAssignmentSettingsNamesToPathsMap: ColorAssignmentSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]),
	settings: DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
})

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
	DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	ColorAssignmentSettingsName,
	colorAssignmentSettingsNamesToPathsMap,
	ColorAssignmentSettingsNamesByType,
}
