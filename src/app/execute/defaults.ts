// tslint:disable:no-any

import { Layer } from '../../types'
import { ExecuteState } from './types'

const DEFAULT_ANIMATION_INTERVAL: undefined = undefined
const DEFAULT_CURRENT_LAYER: Layer = 0 as any
const DEFAULT_GRID_PROGRESS_INTERVAL: undefined = undefined
const DEFAULT_FRAME_ID: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
const DEFAULT_RESOLVE_GRID: () => void = (): void => undefined
const DEFAULT_TILE_COUNT: number = 0
const DEFAULT_TILES_COMPLETED: number = 0

const DEFAULT_EXECUTE_STATE: ExecuteState = {
	animationInterval: DEFAULT_ANIMATION_INTERVAL,
	currentLayer: DEFAULT_CURRENT_LAYER,
	frameId: DEFAULT_FRAME_ID,
	gridProgressInterval: DEFAULT_GRID_PROGRESS_INTERVAL,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

export {
	DEFAULT_EXECUTE_STATE,
}
