import Coordinate from './Coordinate'
import { Units } from '../../components'
import OutlineOptions from './OutlineOptions'

interface GetOutlineParams { tileOrigin: Coordinate, tileSize: Units, outlineOptions?: OutlineOptions }

export default GetOutlineParams
