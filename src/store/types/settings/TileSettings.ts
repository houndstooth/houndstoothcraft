import { TileOriginAndSize, Units } from '../../../components'

type TileSettings = {
	tileSizeSetting?: Units,
	collapseSameColoredShapesWithinTile?: boolean,
	getTileOriginAndSize?(p?: any): TileOriginAndSize,
}

export default TileSettings
