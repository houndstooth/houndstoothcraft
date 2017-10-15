import { Point, Coordinate } from '../types'

const pointAlongTopEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeDowncast = size as any
	const stripePositionDowncast = stripePosition as any

	return [
		stripePositionDowncast * sizeDowncast + x as any,
		y as any,
	] as Coordinate
}

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeDowncast = size as any
	const stripePositionDowncast = stripePosition as any

	return [
		x as any,
		stripePositionDowncast * sizeDowncast + y as any,
	] as Coordinate
}

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeDowncast = size as any
	const stripePositionDowncast = stripePosition as any

	return [
		x as any + sizeDowncast,
		y as any + (stripePositionDowncast - 1) * sizeDowncast,
	] as Coordinate
}

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const sizeDowncast = size as any
	const stripePositionDowncast = stripePosition as any

	return [
		x as any + (stripePositionDowncast - 1) * sizeDowncast,
		y as any + sizeDowncast,
	] as Coordinate
}

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) => {
	const sizeDowncast = size as any

	return [
		x as any + sizeDowncast,
		y as any,
	] as Coordinate
}

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) => {
	const sizeDowncast = size as any

	return [
		x as any + sizeDowncast,
		y as any + sizeDowncast,
	] as Coordinate
}

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) => {
	const sizeDowncast = size as any

	return [
		x as any,
		y as any + sizeDowncast,
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
