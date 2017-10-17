import Coordinate from './Coordinate'
import { Units } from '../../components'
import OutlineOptions from './OutlineOptions'

interface GetOutlineParams { outlineOptions?: OutlineOptions, tileOrigin: Coordinate, tileSize: Units }

export default GetOutlineParams
