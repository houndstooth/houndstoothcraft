import { GetTileOriginAndSize, Unit } from '../../../components'

interface TileSettings {
	collapseSameColoredShapesWithinTile: boolean,
	getTileOriginAndSize: GetTileOriginAndSize,
	tileSizeSetting: Unit,
}

export { TileSettings }
