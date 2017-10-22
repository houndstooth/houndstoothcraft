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
type GetStripePositionsPathShortcut = 'getStripePositions'
type GetTileOriginAndSizePathShortcut = 'getTileOriginAndSize'
type LayerPathShortcut = 'endLayer'
type NumberPathShortcut =
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
type RadianPathShortcut = 'rotateViewAboutCanvasCenter'
type RenderTexturePathShortcut = 'renderTexture'
type UnitPathShortcut = 'tileSize'

type AnimationSettingsPathShortcut = 'animation'
type ColorSettingsPathShortcut = 'color'
type ColorAssignmentPathShortcut = 'colorAssignment'
type GridSettingsPathShortcut = 'grid'
type LayerSettingsPathShortcut = 'layer'
type StripeCountContinuumSettingsPathShortcut = 'stripeCountContinuum'
type StripePositionSettingsPathShortcut = 'stripePosition'
type TextureSettingsPathShortcut = 'texture'
type TileSettingsPathShortcut = 'tile'
type ViewSettingsPathShortcut = 'view'

export {
	BooleanPathShortcut,
	ColorPathShortcut,
	ColorsPathShortcut,
	DimensionPathShortcut,
	FramePathShortcut,
	GetStripePositionsPathShortcut,
	GetTileOriginAndSizePathShortcut,
	LayerPathShortcut,
	NumberPathShortcut,
	RadianPathShortcut,
	RenderTexturePathShortcut,
	UnitPathShortcut,
	AnimationSettingsPathShortcut,
	ColorSettingsPathShortcut,
	ColorAssignmentPathShortcut,
	GridSettingsPathShortcut,
	LayerSettingsPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	ViewSettingsPathShortcut,
}
