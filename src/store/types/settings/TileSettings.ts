import { TileOriginAndSize, Units } from '../../../components'

interface TileSettings {
	collapseSameColoredShapesWithinTile?: boolean,
	tileSizeSetting?: Units,
	getTileOriginAndSize?(p?: any): TileOriginAndSize | undefined,
}

export { TileSettings }
