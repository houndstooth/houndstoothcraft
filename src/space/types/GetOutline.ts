import OutlineOptions from './OutlineOptions'
import Coordinate from './Coordinate'
import { Units } from '../../components'

type GetOutline = {
	({}: { tileOrigin: Coordinate, tileSize: Units, outlineOptions?: OutlineOptions }): Coordinate[],
}

export default GetOutline
