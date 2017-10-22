import * as to from '../utilities/to'

const animation = to.SettingsPath([ 'animationSettings' ])
const refreshCanvas = to.SettingsPath([ 'animationSettings', 'refreshCanvas' ])
const startAnimationFrame = to.SettingsPath([ 'animationSettings', 'startAnimationFrame' ])

const color = to.SettingsPath([ 'colorSettings' ])
const colorSet = to.SettingsPath([ 'colorSettings', 'colorSet' ])
const opacity = to.SettingsPath([ 'colorSettings', 'opacity' ])
const backgroundColor = to.SettingsPath([ 'colorSettings', 'backgroundColor' ])
const colorAssignment = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
const flipGrain = to.SettingsPath([ 'colorSettings', 'colorAssignment', 'flipGrain' ])

const grid = to.SettingsPath([ 'gridSettings' ])
const gridSize = to.SettingsPath([ 'gridSettings', 'gridSize' ])
const includeNegativeQuadrants = to.SettingsPath([ 'gridSettings', 'includeNegativeQuadrants' ])

const layer = to.SettingsPath([ 'layerSettings' ])
const endLayer = to.SettingsPath([ 'layerSettings', 'endLayer' ])

const texture = to.SettingsPath([ 'textureSettings' ])
const renderTexture = to.SettingsPath([ 'textureSettings', 'renderTexture' ])

const tile = to.SettingsPath([ 'tileSettings' ])
const tileSize = to.SettingsPath([ 'tileSettings', 'tileSizeSetting' ])
const getTileOriginAndSize = to.SettingsPath([ 'tileSettings', 'getTileOriginAndSize' ])
const collapseSameColoredShapesWithinTile = to.SettingsPath([ 'tileSettings', 'collapseSameColoredShapesWithinTile' ])

const view = to.SettingsPath([ 'viewSettings' ])
const canvasSize = to.SettingsPath([ 'viewSettings', 'canvasSize' ])
const rotateViewAboutCanvasCenter = to.SettingsPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])
const centerViewOnCenterOfTileAtHomeAddress = to.SettingsPath([
	'viewSettings', 'centerViewOnCenterOfTileAtHomeAddress',
])
const zoomOnCanvasCenter = to.SettingsPath([ 'viewSettings', 'zoomOnCanvasCenter' ])

const stripePosition = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])
const getStripePositions = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'getStripePositions' ])
const stripeCount = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'stripeCountSetting' ])
const stripeCountContinuum = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'stripeCountContinuumSettings',
])

export {
	animation,
	backgroundColor,
	centerViewOnCenterOfTileAtHomeAddress,
	colorAssignment,
	canvasSize,
	collapseSameColoredShapesWithinTile,
	color,
	colorSet,
	endLayer,
	flipGrain,
	getStripePositions,
	getTileOriginAndSize,
	grid,
	gridSize,
	includeNegativeQuadrants,
	layer,
	opacity,
	refreshCanvas,
	renderTexture,
	rotateViewAboutCanvasCenter,
	startAnimationFrame,
	stripeCount,
	stripeCountContinuum,
	stripePosition,
	texture,
	tile,
	tileSize,
	view,
	zoomOnCanvasCenter,
}
