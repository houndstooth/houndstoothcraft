import { TileColorIndices, Unit } from '../../components'
import { Context } from '../../page'
import { Coordinate, Outline } from '../../space'
import { RenderTexture } from './RenderTexture'

type RenderFunction = (_: {
	context: Context,
	outline: Outline,
	renderTexture?: RenderTexture,
	shapeColorIndex?: number,
	tileColorIndices?: TileColorIndices,
	tileOrigin?: Coordinate,
	tileSize?: Unit,
}) => void

export { RenderFunction }
