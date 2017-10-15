import { TileOriginAndSize, Units } from '../../../components'

type TileSettings = {
	tileSizeSetting?: Units,
	collapseSameColoredShapesWithinTile?: boolean,
	getTileOriginAndSize?(p?: any): TileOriginAndSize | undefined,
}

export default TileSettings
