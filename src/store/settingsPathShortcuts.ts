import * as to from '../utilities/to'

const animationSettings = to.SettingsPath([ 'animationSettings' ])
const refreshCanvas = to.SettingsPath([ 'animationSettings', 'refreshCanvas' ])
const startAnimationFrame = to.SettingsPath([ 'animationSettings', 'startAnimationFrame' ])

const colorSettings = to.SettingsPath([ 'colorSettings' ])
const colorSet = to.SettingsPath([ 'colorSettings', 'colorSet' ])
const opacity = to.SettingsPath([ 'colorSettings', 'opacity' ])
const backgroundColor = to.SettingsPath([ 'colorSettings', 'backgroundColor' ])
const colorAssignmentSettings = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
const flipGrain = to.SettingsPath([ 'colorSettings', 'colorAssignment', 'flipGrain' ])

const gridSettings = to.SettingsPath([ 'gridSettings' ])
const gridSize = to.SettingsPath([ 'gridSettings', 'gridSize' ])
const includeNegativeQuadrants = to.SettingsPath([ 'gridSettings', 'includeNegativeQuadrants' ])

const layerSettings = to.SettingsPath([ 'layerSettings' ])
const endLayer = to.SettingsPath([ 'layerSettings', 'endLayer' ])

const stripePositionSettings = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])
const getStripePositions = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'getStripePositions' ])
const stripeCount = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'stripeCount' ])
const stripeCountContinuumSettings = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'stripeCountContinuumSettings',
])

const textureSettings = to.SettingsPath([ 'textureSettings' ])
const renderTexture = to.SettingsPath([ 'textureSettings', 'renderTexture' ])

const tileSettings = to.SettingsPath([ 'tileSettings' ])
const tileSize = to.SettingsPath([ 'tileSettings', 'tileSize' ])
const getTileOriginAndSize = to.SettingsPath([ 'tileSettings', 'getTileOriginAndSize' ])
const collapseSameColoredShapesWithinTile = to.SettingsPath([ 'tileSettings', 'collapseSameColoredShapesWithinTile' ])

const viewSettings = to.SettingsPath([ 'viewSettings' ])
const canvasSize = to.SettingsPath([ 'viewSettings', 'canvasSize' ])
const zoom = to.SettingsPath([ 'viewSettings', 'zoom' ])
const rotateViewAboutCanvasCenter = to.SettingsPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])
const centerViewOnCenterOfTileAtHomeAddress = to.SettingsPath([
	'viewSettings', 'centerViewOnCenterOfTileAtHomeAddress',
])
const zoomOnCanvasCenter = to.SettingsPath([ 'viewSettings', 'zoomOnCanvasCenter' ])

export {
	animationSettings,
	backgroundColor,
	centerViewOnCenterOfTileAtHomeAddress,
	colorAssignmentSettings,
	canvasSize,
	collapseSameColoredShapesWithinTile,
	colorSettings,
	colorSet,
	endLayer,
	flipGrain,
	getStripePositions,
	getTileOriginAndSize,
	gridSettings,
	gridSize,
	includeNegativeQuadrants,
	layerSettings,
	opacity,
	refreshCanvas,
	renderTexture,
	rotateViewAboutCanvasCenter,
	startAnimationFrame,
	stripeCount,
	stripeCountContinuumSettings,
	stripePositionSettings,
	textureSettings,
	tileSettings,
	tileSize,
	viewSettings,
	zoom,
	zoomOnCanvasCenter,
}
