import * as to from '../utilities/to'
import { SettingsPath } from './types/SettingsPath'

const animationSettings: SettingsPath[] = to.SettingsPath([ 'animationSettings' ])
const refreshCanvas: SettingsPath[] = to.SettingsPath([ 'animationSettings', 'refreshCanvas' ])
const startAnimationFrame: SettingsPath[] = to.SettingsPath([ 'animationSettings', 'startAnimationFrame' ])

const colorSettings: SettingsPath[] = to.SettingsPath([ 'colorSettings' ])
const colorSet: SettingsPath[] = to.SettingsPath([ 'colorSettings', 'colorSet' ])
const opacity: SettingsPath[] = to.SettingsPath([ 'colorSettings', 'opacity' ])
const backgroundColor: SettingsPath[] = to.SettingsPath([ 'colorSettings', 'backgroundColor' ])
const colorAssignmentSettings: SettingsPath[] = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
const flipGrain: SettingsPath[] = to.SettingsPath([ 'colorSettings', 'colorAssignment', 'flipGrain' ])

const gridSettings: SettingsPath[] = to.SettingsPath([ 'gridSettings' ])
const gridSize: SettingsPath[] = to.SettingsPath([ 'gridSettings', 'gridSize' ])
const includeNegativeQuadrants: SettingsPath[] = to.SettingsPath([ 'gridSettings', 'includeNegativeQuadrants' ])

const layerSettings: SettingsPath[] = to.SettingsPath([ 'layerSettings' ])
const endLayer: SettingsPath[] = to.SettingsPath([ 'layerSettings', 'endLayer' ])

const stripePositionSettings: SettingsPath[] = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])
const getStripePositions: SettingsPath[] = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'getStripePositions',
])
const stripeCount: SettingsPath[] = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'stripeCount' ])
const stripeCountContinuumSettings: SettingsPath[] = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'stripeCountContinuumSettings',
])

const textureSettings: SettingsPath[] = to.SettingsPath([ 'textureSettings' ])
const executeTexture: SettingsPath[] = to.SettingsPath([ 'textureSettings', 'executeTexture' ])

const tileSettings: SettingsPath[] = to.SettingsPath([ 'tileSettings' ])
const tileSize: SettingsPath[] = to.SettingsPath([ 'tileSettings', 'tileSize' ])
const getTileOriginAndSize: SettingsPath[] = to.SettingsPath([ 'tileSettings', 'getTileOriginAndSize' ])
const collapseSameColoredShapesWithinTile: SettingsPath[] = to.SettingsPath([
	'tileSettings', 'collapseSameColoredShapesWithinTile',
])

const viewSettings: SettingsPath[] = to.SettingsPath([ 'viewSettings' ])
const canvasSize: SettingsPath[] = to.SettingsPath([ 'viewSettings', 'canvasSize' ])
const zoom: SettingsPath[] = to.SettingsPath([ 'viewSettings', 'zoom' ])
const rotateViewAboutCanvasCenter: SettingsPath[] = to.SettingsPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])
const centerViewOnCenterOfTileAtHomeAddress: SettingsPath[] = to.SettingsPath([
	'viewSettings', 'centerViewOnCenterOfTileAtHomeAddress',
])
const zoomOnCanvasCenter: SettingsPath[] = to.SettingsPath([ 'viewSettings', 'zoomOnCanvasCenter' ])

const settingsPathShortcuts: { [ index: string ]: SettingsPath[] } = {
	animationSettings,
	backgroundColor,
	canvasSize,
	centerViewOnCenterOfTileAtHomeAddress,
	collapseSameColoredShapesWithinTile,
	colorAssignmentSettings,
	colorSet,
	colorSettings,
	endLayer,
	executeTexture,
	flipGrain,
	getStripePositions,
	getTileOriginAndSize,
	gridSettings,
	gridSize,
	includeNegativeQuadrants,
	layerSettings,
	opacity,
	refreshCanvas,
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

export { settingsPathShortcuts }
