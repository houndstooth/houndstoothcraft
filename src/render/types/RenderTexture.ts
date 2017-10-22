import { TileColorIndices, Unit } from '../../components'
import { Context } from '../../page'
import { Coordinate } from '../../space'

type RenderTexture = (_: {
	context: Context,
	shapeColorIndex: number,
	tileColorIndices: TileColorIndices,
	tileOrigin: Coordinate,
	tileSize: Unit,
}) => void

export { RenderTexture }
