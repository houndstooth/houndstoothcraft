import { Point, Coordinate } from '../types'

const pointAlongTopEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	stripePosition as any * size + x,
	y,
] as Coordinate

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x,
	stripePosition as any * size + y,
] as Coordinate

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + size,
	y + (stripePosition as any - 1) * size,
] as Coordinate

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + (stripePosition as any - 1) * size,
	y + size,
] as Coordinate

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x + size,
	y,
] as Coordinate

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x + size,
	y + size,
] as Coordinate

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x,
	y + size,
] as Coordinate

export {
	pointAlongTopEdge,
	pointAlongLeftEdge,
	pointAlongRightEdge,
	pointAlongBottomEdge,
	pointInTopRightCorner,
	pointInBottomRightCorner,
	pointInBottomLeftCorner,
}
