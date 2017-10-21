import { TileOriginAndSize, Unit } from '../../../components'

interface TileSettings {
	collapseSameColoredShapesWithinTile: boolean,
	tileSizeSetting: Unit,
	getTileOriginAndSize(p?: any): TileOriginAndSize | undefined,
}

export { TileSettings }
