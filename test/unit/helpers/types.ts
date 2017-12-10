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
	Layer,
	layerSettings,
	NullarySideEffector,
	OffsetAddress,
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

type SimulateClick = (checkbox: HTMLInputElement, clickHandler: NullarySideEffector) => void

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

interface BuildMockElementParams {
	readonly attributeObject?: { [ index: string ]: string },
	readonly children?: HTMLElement[],
	readonly classList?: string[],
	readonly clickSpy?: Spy,
	readonly parentNodeInsertBeforeSpy?: Spy,
	readonly parentNodeRemoveChildSpy?: Spy,
}

interface MockElement {
	appendChild?: any,
	classList?: any,
	click?: any,
	disabled?: any,
	download?: any,
	href?: any,
	innerHTML?: any,
	nextSibling?: any,
	onchange?: any,
	onclick?: any,
	parentNode?: any,
	setAttribute?: any,
	style: {
		cursor?: any,
		display?: any,
		fill?: any,
		fontFamily?: any,
		fontSize?: any,
		height?: any,
		justifyContent?: any,
		left?: any,
		margin?: any,
		padding?: any,
		position?: any,
		top?: any,
		width?: any,
		zIndex?: any,
	},
	textContent?: any,
}

interface MockCanvas extends MockElement {
	getContext?: any,
	height?: any,
	width?: any,
}

interface BuildMockContext {
	readonly clearRectSpy?: Spy,
	readonly contextCallsOrder?: MockContextCall[],
	readonly drawImageSpy?: Spy,
	readonly fillRectSpy?: Spy,
	readonly toBlobSpy?: Spy,
}

interface MockContext {
	arc?: any,
	beginPath?: any,
	canvas?: any,
	clearRect?: any,
	clip?: any,
	closePath?: any,
	drawImage?: any,
	fill?: any,
	fillRect?: any,
	fillStyle?: any,
	fillText?: any,
	font?: any,
	globalAlpha?: any,
	globalCompositeOperation?: any,
	lineTo?: any,
	moveTo?: any,
	restore?: any,
	save?: any,
	stroke?: any,
	strokeStyle?: any,
	toBlob?: any,
}

interface MockContextCall {
	method: MockContextMethod,
	x?: number,
	y?: number
}

type MockContextMethod =
	| 'beginPath'
	| 'clearRect'
	| 'clip'
	| 'closePath'
	| 'fill'
	| 'lineTo'
	| 'moveTo'
	| 'restore'
	| 'save'

export {
	BuildMockContext,
	MockContext,
	MockContextCall,
	MockContextMethod,
	MockCanvas,
	MockElement,
	BuildMockElementParams,
	ExampleSettings,
	ExampleSettingsStructure,
	SimulateClick,
	SetPatternStateForTest,
	TestObject,
}
