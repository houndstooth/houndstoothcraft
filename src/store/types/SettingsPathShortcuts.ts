type BooleanPathShortcut =
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'flipGrain'
	| 'includeNegativeQuadrants'
	| 'refreshCanvas'
	| 'zoomOnCanvasCenter'
type ColorPathShortcut = 'backgroundColor'
type ColorsPathShortcut = 'colorSet'
type DimensionPathShortcut = 'canvasSize'
type FramePathShortcut = 'startAnimationFrame'
type GetTileOriginAndSizePathShortcut = 'getTileOriginAndSize'
type LayerPathShortcut = 'endLayer'
type NumberPathShortcut =
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
	| 'zoom'
type RadianPathShortcut = 'rotateViewAboutCanvasCenter'
type ExecuteTexturePathShortcut = 'executeTexture'
type UnitPathShortcut = 'tileSize'

type AnimationSettingsPathShortcut = 'animationSettings'
type ColorSettingsPathShortcut = 'colorSettings'
type ColorAssignmentSettingsPathShortcut = 'colorAssignmentSettings'
type GridSettingsPathShortcut = 'gridSettings'
type LayerSettingsPathShortcut = 'layerSettings'
type StripeCountContinuumSettingsPathShortcut = 'stripeCountContinuumSettings'
type StripePositionSettingsPathShortcut = 'stripePositionSettings'
type TextureSettingsPathShortcut = 'textureSettings'
type TileSettingsPathShortcut = 'tileSettings'
type ViewSettingsPathShortcut = 'viewSettings'

export {
	BooleanPathShortcut,
	ColorPathShortcut,
	ColorsPathShortcut,
	DimensionPathShortcut,
	FramePathShortcut,
	GetTileOriginAndSizePathShortcut,
	LayerPathShortcut,
	NumberPathShortcut,
	RadianPathShortcut,
	ExecuteTexturePathShortcut,
	UnitPathShortcut,
	AnimationSettingsPathShortcut,
	ColorSettingsPathShortcut,
	ColorAssignmentSettingsPathShortcut,
	GridSettingsPathShortcut,
	LayerSettingsPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	ViewSettingsPathShortcut,
}
