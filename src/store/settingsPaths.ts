import * as to from '../to'

const animation = to.SettingsPath([ 'animationSettings' ])
const refreshCanvas = to.SettingsPath([ 'animationSettings', 'refreshCanvas' ])
const startAnimationFrame = to.SettingsPath([ 'animationSettings', 'startAnimationFrame' ])

const color = to.SettingsPath([ 'colorSettings' ])
const colorSet = to.SettingsPath([ 'colorSettings', 'colorSet' ])
const colorAssignment = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])

const grid = to.SettingsPath([ 'gridSettings' ])
const gridSize = to.SettingsPath([ 'gridSettings', 'gridSize' ])

const layer = to.SettingsPath([ 'layerSettings' ])
const endLayer = to.SettingsPath([ 'layerSettings', 'endLayer' ])

const texture = to.SettingsPath([ 'textureSettings' ])
const renderTexture = to.SettingsPath([ 'textureSettings', 'renderTexture' ])

const tile = to.SettingsPath([ 'tileSettings' ])
const tileSize = to.SettingsPath([ 'tileSettings', 'tileSizeSetting' ])
const getTileOriginAndSize = to.SettingsPath([ 'tileSettings', 'getTileOriginAndSize' ])

const view = to.SettingsPath([ 'viewSettings' ])
const canvasSize = to.SettingsPath([ 'viewSettings', 'canvasSize' ])
const rotateViewAboutCanvasCenter = to.SettingsPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])

const stripePosition = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])
const stripeCount = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'stripeCountSetting' ])
const stripeCountContinuum = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'stripeCountContinuumSettings',
])

export {
	animation,
	colorAssignment,
	canvasSize,
	color,
	colorSet,
	endLayer,
	getTileOriginAndSize,
	grid,
	gridSize,
	layer,
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
}
