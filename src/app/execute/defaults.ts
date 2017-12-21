// tslint:disable:no-any

import { Layer } from '../../types'
import { ExecuteState } from './types'

const DEFAULT_ANIMATION_INTERVAL: undefined = undefined
const DEFAULT_CURRENT_LAYER: Layer = 0 as any
const DEFAULT_PATTERN_ID: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
/* istanbul ignore next */
const DEFAULT_RESOLVE_ANIMATION: () => void = (): void => undefined
/* istanbul ignore next */
const DEFAULT_RESOLVE_GRID: () => void = (): void => undefined
const DEFAULT_TILE_COUNT: number = 0
const DEFAULT_TILES_COMPLETED: number = 0

const DEFAULT_EXECUTE_STATE: ExecuteState = {
	animationInterval: DEFAULT_ANIMATION_INTERVAL,
	currentLayer: DEFAULT_CURRENT_LAYER,
	patternId: DEFAULT_PATTERN_ID,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	resolveAnimation: DEFAULT_RESOLVE_ANIMATION,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

export {
	DEFAULT_EXECUTE_STATE,
}
