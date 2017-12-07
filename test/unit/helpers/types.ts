// tslint:disable:max-file-line-count max-line-length

import {
	animationSettings,
	AssignmentMode,
	BaseStripeDiagonal,
	Color,
	colorAssignmentSettings,
	ColorSet,
	colorSettings,
	ExecuteTexture,
	GetStripePositions,
	GetTileOriginAndSize,
	gridSettings,
	InputElement,
	Layer,
	layerSettings,
	NullarySideEffector,
	OffsetAddress,
	PageElement,
	Px,
	Radian,
	SettingsNamesByType,
	stripeCountContinuumSettings,
	StripeCountMode,
	stripePositionSettings,
	stripeSettings,
	Supertile,
	textureSettings,
	tileSettings,
	TransformShapeColorIndices,
	Unit,
	viewSettings,
	Weave,
} from '../../../src'
import Spy = jasmine.Spy

interface BuildMockElementParams {
	readonly attributeObject?: { [ index: string ]: string },
	readonly children?: PageElement[],
	readonly classList?: string[],
	readonly clickSpy?: Spy,
	readonly parentNodeInsertBeforeSpy?: Spy,
	readonly parentNodeRemoveChildSpy?: Spy,
}

interface ExampleSettings extends ExampleSettingsStructure {
	settingOne: number,
	settingTwo: string,
	[_: string]: number | string,
}

interface ExampleSettingsStructure {
	settingOne: {},
	settingTwo: {},
}

interface TestObject {
	aaa?: string,
	bbb?: string,
}

type SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector) => void

interface SetPatternStateForTest {
	(settingName: animationSettings.AnimationSettingsName, value: Partial<animationSettings.AnimationSettings>): void,
	(settingName: colorSettings.ColorSettingsName, value: Partial<colorSettings.ColorSettings>): void,
	(settingName: colorAssignmentSettings.ColorAssignmentSettingsName, value: Partial<colorAssignmentSettings.ColorAssignmentSettings>): void,
	(settingName: gridSettings.GridSettingsName, value: Partial<gridSettings.GridSettings>): void,
	(settingName: layerSettings.LayerSettingsName, value: Partial<layerSettings.LayerSettings>): void,
	(settingName: stripeSettings.StripeSettingsName, value: Partial<stripeSettings.StripeSettings>): void,
	(settingName: stripeCountContinuumSettings.StripeCountContinuumSettingsName, value: Partial<stripeCountContinuumSettings.StripeCountContinuumSettings>): void,
	(settingName: stripePositionSettings.StripePositionSettingsName, value: Partial<stripePositionSettings.StripePositionSettings>): void,
	(settingName: textureSettings.TextureSettingsName, value: Partial<textureSettings.TextureSettings>): void,
	(settingName: tileSettings.TileSettingsName, value: Partial<tileSettings.TileSettings>): void,
	(settingName: viewSettings.ViewSettingsName, value: Partial<viewSettings.ViewSettings>): void,
	(settingName: SettingsNamesByType['AssignmentModeTypedSettingsNames'], value: AssignmentMode): void,
	(settingName: SettingsNamesByType['BaseStripeDiagonalTypedSettingsNames'], value: BaseStripeDiagonal): void,
	(settingName: SettingsNamesByType['BooleanTypedSettingsNames'], value: boolean): void,
	(settingName: SettingsNamesByType['ColorTypedSettingsNames'], value: Color): void,
	(settingName: SettingsNamesByType['ColorSetTypedSettingsNames'], value: ColorSet): void,
	(settingName: SettingsNamesByType['ColorsTypedSettingsNames'], value: Color[]): void,
	(settingName: SettingsNamesByType['ExecuteTextureTypedSettingsNames'], value: ExecuteTexture): void,
	(settingName: SettingsNamesByType['GetStripePositionsTypedSettingsNames'], value: GetStripePositions): void,
	(settingName: SettingsNamesByType['GetTileOriginAndSizeTypedSettingsNames'], value: GetTileOriginAndSize): void,
	(settingName: SettingsNamesByType['LayerTypedSettingsNames'], value: Layer): void,
	(settingName: SettingsNamesByType['NumberTypedSettingsNames'], value: number): void,
	(settingName: SettingsNamesByType['OffsetAddressTypedSettingsNames'], value: OffsetAddress): void,
	(settingName: SettingsNamesByType['PxTypedSettingsNames'], value: Px): void,
	(settingName: SettingsNamesByType['RadianTypedSettingsNames'], value: Radian): void,
	(settingName: SettingsNamesByType['StripeCountModeTypedSettingsNames'], value: StripeCountMode): void,
	(settingName: SettingsNamesByType['SupertileTypedSettingsNames'], value: Supertile): void,
	(settingName: SettingsNamesByType['TransformShapeColorIndicesTypedSettingsNames'], value: TransformShapeColorIndices): void,
	(settingName: SettingsNamesByType['UnitTypedSettingsNames'], value: Unit): void,
	(settingName: SettingsNamesByType['WeaveTypedSettingsNames'], value: Weave): void,
}

export {
	BuildMockElementParams,
	ExampleSettings,
	ExampleSettingsStructure,
	SimulateClick,
	SetPatternStateForTest,
	TestObject,
}
