// tslint:disable:no-any

import { Layer } from '../../types'
import { NullarySideEffector } from '../../utilities'
import { ExecuteState } from './types'

const DEFAULT_ANIMATION_INTERVAL: undefined = undefined
const DEFAULT_CURRENT_LAYER: Layer = 0 as any
const DEFAULT_GRID_PROGRESS_INTERVAL: undefined = undefined
const DEFAULT_PATTERN_REF: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
const DEFAULT_RESOLVE_GRID: NullarySideEffector = (): void => undefined
const DEFAULT_TILE_COUNT: number = 0
const DEFAULT_TILES_COMPLETED: number = 0

const DEFAULT_EXECUTE_STATE: ExecuteState = {
	animationInterval: DEFAULT_ANIMATION_INTERVAL,
	currentLayer: DEFAULT_CURRENT_LAYER,
	gridProgressInterval: DEFAULT_GRID_PROGRESS_INTERVAL,
	patternRef: DEFAULT_PATTERN_REF,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

export {
	DEFAULT_EXECUTE_STATE,
}
