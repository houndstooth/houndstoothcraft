import 'jasmine'

import setup from '../../application/setup'
import execute from '../../application/execute'
import ctx from '../../render/ctx'
import state from '../../state/state'
import { BLACK, TRANSPARENT } from '../../application/constants'

describe("Standard Houndstooth", () => {
	beforeEach(() => {
		setup({
			effects: [],
			debugging: false
		})

		state.tileConfig = {
			tileSize: 50,
			isTileUniform: null,
			getCoordinates: {
				whenTileIsUniform: null,
				whenTileIsMultiform: null
			}
		}
		state.gridConfig = {
			gridSize: 2
		}
		state.viewConfig = {
			canvasSize: 100,
			zoom: 1
		}
		state.colorConfig = {
			set: [ BLACK, TRANSPARENT ],
			assignment: {
				mode: 'WEAVE',
				weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
			}
		}

		execute({
			iterating: false,
			animating: false,
			exportFrames: false,
			performanceLogging: false
		})
	})

	it("has four stripes in a striped square", () => {
		expect(pixel(sectorCenter({ x: 0, y: 0, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })

		expect(pixel(sectorCenter({ x: 2, y: 0, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })
		expect(pixel(sectorCenter({ x: 1, y: 1, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })
		expect(pixel(sectorCenter({ x: 0, y: 2, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })

		expect(pixel(sectorCenter({ x: 3, y: 1, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })
		expect(pixel(sectorCenter({ x: 2, y: 2, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })
		expect(pixel(sectorCenter({ x: 1, y: 3, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 0 })

		expect(pixel(sectorCenter({ x: 3, y: 3, n: 4 }))).toEqual({ r: 0, g: 0, b: 0, a: 1 })
	})

	it("repeats a 2x2 pattern of a solid black, solid white, and two b&w striped tiles", () => {

	})
})

const pixel = ([ x, y ]) => {
	const pixelData = ctx.getImageData(x, y, 1, 1).data
	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255
	}
}

const sectorCenter = ({ x, y, n }) => {
	const sectorSize = state.tileConfig.tileSize / n
	return [ (x + 0.5) * sectorSize, (y + 0.5) * sectorSize ]
}
