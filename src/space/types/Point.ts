import { PointParams } from './PointParams'
import { Coordinate } from './Coordinate'

type Point = (_: PointParams) => Coordinate

export { Point }
