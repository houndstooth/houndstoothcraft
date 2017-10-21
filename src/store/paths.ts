import * as to from '../to'

const animation = to.PropertyPath([ 'animationSettings' ])
const refreshCanvas = to.PropertyPath([ 'animationSettings', 'refreshCanvas' ])
const startAnimationFrame = to.PropertyPath([ 'animationSettings', 'startAnimationFrame' ])

const color = to.PropertyPath([ 'colorSettings' ])
const colorSet = to.PropertyPath([ 'colorSettings', 'colorSet' ])
const assignment = to.PropertyPath([ 'colorSettings', 'assignment' ])

const grid = to.PropertyPath([ 'gridSettings' ])
const gridSize = to.PropertyPath([ 'gridSettings', 'gridSize' ])

const layer = to.PropertyPath([ 'layerSettings' ])
const endLayer = to.PropertyPath([ 'layerSettings', 'endLayer' ])

const texture = to.PropertyPath([ 'textureSettings' ])
const renderTexture = to.PropertyPath([ 'textureSettings', 'renderTexture' ])

const tile = to.PropertyPath([ 'tileSettings' ])
const tileSize = to.PropertyPath([ 'tileSettings', 'tileSizeSetting' ])
const getTileOriginAndSize = to.PropertyPath([ 'tileSettings', 'getTileOriginAndSize' ])

const view = to.PropertyPath([ 'viewSettings' ])
const canvasSize = to.PropertyPath([ 'viewSettings', 'canvasSize' ])
const rotateViewAboutCanvasCenter = to.PropertyPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])

const stripePosition = to.PropertyPath([ 'stripeSettings', 'stripePositionSettings' ])
const stripeCount = to.PropertyPath([ 'stripeSettings', 'stripePositionSettings', 'stripeCountSetting' ])
const stripeCountContinuum = to.PropertyPath([
	'stripeSettings', 'stripePositionSettings', 'stripeCountContinuumSettings',
])

export {
	animation,
	assignment,
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
