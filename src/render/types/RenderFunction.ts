import { TileColorIndices, Units } from '../../components'
import { Context } from '../../page'
import { Coordinate, Outline } from '../../space'

type RenderTexture = (_: {
	context: Context,
	outline: Outline,
	shapeColorIndex?: number,
	tileColorIndices?: TileColorIndices,
	tileOrigin?: Coordinate,
	tileSize?: Units,
}) => void

type RenderFunction = (_: {
	context: Context,
	outline: Outline,
	renderTexture?: RenderTexture,
	shapeColorIndex?: number,
	tileColorIndices?: TileColorIndices,
	tileOrigin?: Coordinate,
	tileSize?: Units,
}) => void

export { RenderFunction }
