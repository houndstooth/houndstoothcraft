import { TileOriginAndSize, Units } from '../../../components'

type TileSettings = {
	collapseSameColoredShapesWithinTile?: boolean,
	tileSizeSetting?: Units,
	getTileOriginAndSize?(p?: any): TileOriginAndSize | undefined,
}

export default TileSettings
