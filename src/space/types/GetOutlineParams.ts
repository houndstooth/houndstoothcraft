import { Units } from '../../components'
import { Coordinate } from './Coordinate'
import { OutlineOptions } from './OutlineOptions'

interface GetOutlineParams { outlineOptions?: OutlineOptions, tileOrigin: Coordinate, tileSize: Units }

export { GetOutlineParams }
