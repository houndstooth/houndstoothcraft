import { TileColorIndices, Unit } from '../../components'
import { Context } from '../../page'
import { Coordinate, Outline } from '../../space'

type RenderTexture = (_: {
	context: Context,
	outline: Outline,
	shapeColorIndex?: number,
	tileColorIndices?: TileColorIndices,
	tileOrigin?: Coordinate,
	tileSize?: Unit,
}) => void

export { RenderTexture }
