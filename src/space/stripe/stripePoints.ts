import { Point, Coordinate } from '../types'

const pointAlongTopEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeAsNumber = size as number
	const stripePositionAsAny = stripePosition as any

	return [
		stripePositionAsAny * sizeAsNumber + x,
		y,
	] as Coordinate
}

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeAsNumber = size as number
	const stripePositionAsAny = stripePosition as any

	return [
		x,
		stripePositionAsAny * sizeAsNumber + y,
	] as Coordinate
}

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeAsNumber = size as number
	const stripePositionAsAny = stripePosition as any

	return [
		x + sizeAsNumber,
		y + (stripePositionAsAny - 1) * sizeAsNumber,
	] as Coordinate
}

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeAsNumber = size as number
	const stripePositionAsAny = stripePosition as any

	return [
		x + (stripePositionAsAny - 1) * sizeAsNumber,
		y + sizeAsNumber,
	] as Coordinate
}

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) => {
	const sizeAsNumber = size as number

	return [
		x + sizeAsNumber,
		y,
	] as Coordinate
}

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) => {
	const sizeAsNumber = size as number

	return [
		x + sizeAsNumber,
		y + sizeAsNumber,
	] as Coordinate
}

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) => {
	const sizeAsNumber = size as number

	return [
		x,
		y + sizeAsNumber,
	] as Coordinate
}

export {
	pointAlongTopEdge,
	pointAlongLeftEdge,
	pointAlongRightEdge,
	pointAlongBottomEdge,
	pointInTopRightCorner,
	pointInBottomRightCorner,
	pointInBottomLeftCorner,
}
