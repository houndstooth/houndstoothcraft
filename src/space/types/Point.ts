import { Coordinate } from './Coordinate'
import { PointParams } from './PointParams'

type Point = (_: PointParams) => Coordinate

export { Point }
