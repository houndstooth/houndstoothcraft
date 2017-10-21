import * as to from '../../src/to'

const CANVAS_SIZE = to.PropertyPath([ 'viewSettings', 'canvasSize' ])
const TILE_SIZE = to.PropertyPath([ 'tileSettings', 'tileSizeSetting' ])

export {
	CANVAS_SIZE,
	TILE_SIZE,
}
