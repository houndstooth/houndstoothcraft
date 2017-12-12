import { GridSettings } from './gridSettings'

const DEFAULT_TILE_RESOLUTION: number = 16
const DEFAULT_INCLUDE_NEGATIVE_QUADRANTS: boolean = false

const DEFAULT_GRID_SETTINGS: GridSettings = {
	includeNegativeQuadrants: DEFAULT_INCLUDE_NEGATIVE_QUADRANTS,
	tileResolution: DEFAULT_TILE_RESOLUTION,
}

export {
	DEFAULT_GRID_SETTINGS,
}
