import * as to from '../utilities/to'
import {
	animationSettings,
	settingsPathShortcuts as animationSettingsPathShortcuts,
} from './types/settings/AnimationSettings'
import { SettingsStep } from './types/SettingsStep'

const colorSettings: SettingsStep[] = to.SettingsPath([ 'colorSettings' ])
const colorSet: SettingsStep[] = to.SettingsPath([ 'colorSettings', 'colorSet' ])
const opacity: SettingsStep[] = to.SettingsPath([ 'colorSettings', 'opacity' ])
const backgroundColor: SettingsStep[] = to.SettingsPath([ 'colorSettings', 'backgroundColor' ])
const colorAssignmentSettings: SettingsStep[] = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
const flipGrain: SettingsStep[] = to.SettingsPath([ 'colorSettings', 'colorAssignment', 'flipGrain' ])

const gridSettings: SettingsStep[] = to.SettingsPath([ 'gridSettings' ])
const gridSize: SettingsStep[] = to.SettingsPath([ 'gridSettings', 'gridSize' ])
const includeNegativeQuadrants: SettingsStep[] = to.SettingsPath([ 'gridSettings', 'includeNegativeQuadrants' ])

const layerSettings: SettingsStep[] = to.SettingsPath([ 'layerSettings' ])
const endLayer: SettingsStep[] = to.SettingsPath([ 'layerSettings', 'endLayer' ])

const stripePositionSettings: SettingsStep[] = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])
const getStripePositions: SettingsStep[] = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'getStripePositions',
])
const stripeCount: SettingsStep[] = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings', 'stripeCount' ])
const stripeCountContinuumSettings: SettingsStep[] = to.SettingsPath([
	'stripeSettings', 'stripePositionSettings', 'stripeCountContinuumSettings',
])

const textureSettings: SettingsStep[] = to.SettingsPath([ 'textureSettings' ])
const executeTexture: SettingsStep[] = to.SettingsPath([ 'textureSettings', 'executeTexture' ])

const tileSettings: SettingsStep[] = to.SettingsPath([ 'tileSettings' ])
const tileSize: SettingsStep[] = to.SettingsPath([ 'tileSettings', 'tileSize' ])
const getTileOriginAndSize: SettingsStep[] = to.SettingsPath([ 'tileSettings', 'getTileOriginAndSize' ])
const collapseSameColoredShapesWithinTile: SettingsStep[] = to.SettingsPath([
	'tileSettings', 'collapseSameColoredShapesWithinTile',
])

const viewSettings: SettingsStep[] = to.SettingsPath([ 'viewSettings' ])
const canvasSize: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'canvasSize' ])
const zoom: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'zoom' ])
const rotateViewAboutCanvasCenter: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])
const centerViewOnCenterOfTileAtHomeAddress: SettingsStep[] = to.SettingsPath([
	'viewSettings', 'centerViewOnCenterOfTileAtHomeAddress',
])
const zoomOnCanvasCenter: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'zoomOnCanvasCenter' ])

const settingsPathShortcuts: { [ index: string ]: SettingsStep[] } = {
	animationSettings, ...animationSettingsPathShortcuts,
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
	rotateViewAboutCanvasCenter,
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
