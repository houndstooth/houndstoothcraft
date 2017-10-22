import {
	AnimationSettingsPathShortcut,
	BooleanPathShortcut,
	ColorAssignmentPathShortcut,
	ColorPathShortcut,
	ColorSettingsPathShortcut,
	ColorsPathShortcut,
	DimensionPathShortcut,
	FramePathShortcut,
	GetStripePositionsPathShortcut,
	GetTileOriginAndSizePathShortcut,
	GridSettingsPathShortcut,
	LayerPathShortcut,
	LayerSettingsPathShortcut,
	NumberPathShortcut,
	RadianPathShortcut,
	RenderTexturePathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	UnitPathShortcut,
	ViewSettingsPathShortcut,
} from './SettingsPathShortcuts'

type AllSettingsPathShortcuts =
	| BooleanPathShortcut
	| ColorPathShortcut
	| ColorsPathShortcut
	| DimensionPathShortcut
	| FramePathShortcut
	| GetStripePositionsPathShortcut
	| GetTileOriginAndSizePathShortcut
	| LayerPathShortcut
	| NumberPathShortcut
	| RadianPathShortcut
	| RenderTexturePathShortcut
	| UnitPathShortcut
	| AnimationSettingsPathShortcut
	| ColorSettingsPathShortcut
	| ColorAssignmentPathShortcut
	| GridSettingsPathShortcut
	| LayerSettingsPathShortcut
	| StripeCountContinuumSettingsPathShortcut
	| StripePositionSettingsPathShortcut
	| TextureSettingsPathShortcut
	| TileSettingsPathShortcut
	| ViewSettingsPathShortcut

export { AllSettingsPathShortcuts }
