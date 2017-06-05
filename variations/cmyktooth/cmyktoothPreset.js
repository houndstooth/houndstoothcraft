import currentIteration from '../../shared/state/currentIteration'
import { BLACK, CYAN, MAGENTA, TRANSPARENT, YELLOW } from '../../shared/application/constants'
import state from '../../shared/state/state'

const CMYKTOOTH_COLORS = [ BLACK, CYAN, MAGENTA, YELLOW ]
const CMYKTOOTH_SIZE = 1000
const GRID_SIZE = 31
const OFFSET_GRID = GRID_SIZE % 2 === 0 ? (GRID_SIZE / 2) % 2 : ((GRID_SIZE + 1) / 2) % 2

export default {
	state: {
		tileSize: CMYKTOOTH_SIZE,
		canvasSize: CMYKTOOTH_SIZE,
		gridSize: GRID_SIZE,
		colorConfig: {
			set: [ CMYKTOOTH_COLORS[ (currentIteration.i + 3) % 4 ], TRANSPARENT ],
			opacity: .5,
			assignment: {
				offset: [ OFFSET_GRID === 1 ? 0 : 1, OFFSET_GRID ]
			}
		},
		negativeGridToo: true,
		iteration: {
			startIteration: 0,
			endIteration: 16
		}
	},
	iterations: {
		tileSize: p => p / Math.sqrt(2),
		colorConfig: {
			set: () => [ CMYKTOOTH_COLORS[ currentIteration.i % 4 ], TRANSPARENT ],
			opacity: () => 1 / (currentIteration.i + 2)
		},
		gridRotationAboutCenter: p => p + (Math.PI / 4),
		offsetOrigin: () => {
			if (state.houndsmorphosisMode) return [ CMYKTOOTH_SIZE / 2, CMYKTOOTH_SIZE / 2 ]
			const offset = CMYKTOOTH_SIZE / 2 - CMYKTOOTH_SIZE / Math.pow(2, 1 + (currentIteration.i + 1) / 2)
			return [ offset, offset ]
		}
	}
}
