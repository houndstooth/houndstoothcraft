import cmyktooth from '../../cmyktooth/cmyktooth'
const GRID_SIZE = 31
const OFFSET_GRID = GRID_SIZE % 2 === 0 ? (GRID_SIZE / 2) % 2 : ((GRID_SIZE + 1) / 2) % 2

export default {
	shared: {
		tileSize: cmyktooth.CMYKTOOTH_SIZE,
		canvasSize: cmyktooth.CMYKTOOTH_SIZE,
		gridSize: GRID_SIZE,
		opacity: .5,
		supertileOffset: [ OFFSET_GRID === 1 ? 0 : 1, OFFSET_GRID ],
		negativeGridToo: true
	},
	iteration: {
		iterating: true,
		startIteration: 0,
		endIteration: 16
	}
}
