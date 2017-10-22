type ColorsPathShortcut =
	| 'colorSet'

type BooleanPathShortcut =
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'flipGrain'
	| 'includeNegativeQuadrants'
	| 'refreshCanvas'
	| 'zoomOnCanvasCenter'

type DimensionPathShortcut =
	| 'canvasSize'

type FramePathShortcut =
	| 'startAnimationFrame'

type GetStripePositionsPathShortcut =
	| 'getStripePositions'

type GetTileOriginAndSizePathShortcut =
	| 'getTileOriginAndSize'

type LayerPathShortcut =
	| 'endLayer'

type NumberPathShortcut =
	| 'gridSize'
	| 'stripeCount'

type RadianPathShortcut =
	| 'rotateViewAboutCanvasCenter'

type RenderTexturePathShortcut =
	| 'renderTexture'

type UnitPathShortcut =
	| 'tileSize'

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

type SettingsPathShortcuts =
	| ColorsPathShortcut
	| BooleanPathShortcut
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

export {
	SettingsPathShortcuts,
	GetTileOriginAndSizePathShortcut,
	ColorsPathShortcut,
	BooleanPathShortcut,
	DimensionPathShortcut,
	FramePathShortcut,
	GetStripePositionsPathShortcut,
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
