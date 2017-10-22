import { GetTileOriginAndSize, Unit } from '../../../components'

interface TileSettings {
	collapseSameColoredShapesWithinTile: boolean,
	getTileOriginAndSize: GetTileOriginAndSize,
	tileSize: Unit,
}

export { TileSettings }
