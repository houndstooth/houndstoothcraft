import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET, STANDARD_SUPERTILE } from '../application/constants'
import calculateDerasterizedByAreaStripe from '../../derasterized/calculateDerasterizedByAreaStripe'
import calculateGinghamChevronContinuumStripes from '../../gingham-chevron-continuum/calculateGinghamChevronContinuumStripes'
import maybeRealignColors from '../../gingham-chevron-continuum/maybeRealignColors'
import { GONGRAM_SUPERTILE } from '../../gongram/gongramConstants'
import calculateHarmonicContinuumSegmentStripe from '../../harmonitooth/calculateHarmonicContinuumSegmentStripe'
import calculateHarmonicContinuumStripe from '../../harmonitooth/calculateHarmonicContinuumStripe'
import render from '../render/render'
import state from '../state/state'
import calculateColor from '../utilities/calculateColor'
import convertSquareTypeToColors from '../utilities/convertSquareTypeToColors'
import iterator from '../utilities/iterator'
import rotateCoordinateAboutPoint from '../utilities/rotateCoordinateAboutPoint'
import scalePoint from '../utilities/scalePoint'

const PERIMETER_SCALAR = 2

const calculateSquare = ({ center, sizedUnit }) => {
	const halfSizedUnit = sizedUnit / 2
	return [
		[
			center[ 0 ] - halfSizedUnit,
			center[ 1 ] - halfSizedUnit
		],
		[
			center[ 0 ] + halfSizedUnit,
			center[ 1 ] - halfSizedUnit
		],
		[
			center[ 0 ] + halfSizedUnit,
			center[ 1 ] + halfSizedUnit
		],
		[
			center[ 0 ] - halfSizedUnit,
			center[ 1 ] + halfSizedUnit
		]
	]
}

const rotateCoordinatesAboutPoint = ({ coordinates, point, rotation }) => {
	return coordinates.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}

const maybeRotateCoordinates = ({ coordinates, center, /* origin,*/ rotationAboutCenter }) => {
	if (rotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: rotationAboutCenter
		})
	}

	// if (rotationAboutOrigin) {
	// 	coordinates = rotateCoordinatesAboutPoint({
	// 		point: origin,
	// 		coordinates: coordinates,
	// 		rotation: rotationAboutOrigin
	// 	})
	// }

	const { baseStripeDiagonal, tileRotationAboutTileCenter, canvasSize, gridRotationAboutCenter } = state.shared

	const offset = baseStripeDiagonal === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const extraRotation = offset + tileRotationAboutTileCenter
	if (extraRotation !== 0) {
		coordinates = rotateCoordinatesAboutPoint({
			point: center,
			coordinates: coordinates,
			rotation: extraRotation
		})
	}

	if (gridRotationAboutCenter) {
		coordinates = rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: coordinates,
			rotation: gridRotationAboutCenter
		})
	}

	return coordinates
}

const drawStripes = ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes }) => {
	stripes.forEach((currentPositionAlongPerimeter, index) => {
		const color = calculateColor({ colors, index })
		if (color.a === 0) return
		const nextPositionAlongPerimeter = stripes[ index + 1 ] || 2

		let coordinates = calculateAnIndividualStripesCoordinates({
			currentPositionAlongPerimeter,
			nextPositionAlongPerimeter,
			sizedUnit,
			origin
		})
		coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })

		render({ color, coordinates })
	})
}

const calculateAnIndividualStripesCoordinates = ({ currentPositionAlongPerimeter, nextPositionAlongPerimeter, sizedUnit, origin }) => {
	let coordinates = []

	if (currentPositionAlongPerimeter <= 1) {
		coordinates.push([
			origin[ 0 ] + currentPositionAlongPerimeter * sizedUnit,
			origin[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (currentPositionAlongPerimeter - 1) * sizedUnit
		])
	}

	if ((nextPositionAlongPerimeter) <= 1) {
		coordinates.push([
			origin[ 0 ] + (nextPositionAlongPerimeter) * sizedUnit,
			origin[ 1 ]
		])
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + (nextPositionAlongPerimeter) * sizedUnit
		])
	} else {
		if (currentPositionAlongPerimeter <= 1) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ]
			])
		}

		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (nextPositionAlongPerimeter - 1) * sizedUnit
		])
		coordinates.push([
			origin[ 0 ] + (nextPositionAlongPerimeter - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	if (currentPositionAlongPerimeter <= 1) {
		if ((nextPositionAlongPerimeter) > 1) {
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + sizedUnit
			])
		}
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + currentPositionAlongPerimeter * sizedUnit
		])
	} else {
		coordinates.push([
			origin[ 0 ] + (currentPositionAlongPerimeter - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	return coordinates
}

const drawSquare = ({ sizedUnit, center, origin, rotationAboutCenter, color }) => {
	let coordinates = calculateSquare({ center, sizedUnit })
	coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })
	render({ color, coordinates })
}

const mixColors = ({ colors }) => {
	let mixedColor = {}

	mixedColor.r = Math.floor((colors[ 0 ].r || 0 + colors[ 1 ].r || 0) / 2)
	mixedColor.g = Math.floor((colors[ 0 ].g || 0 + colors[ 1 ].g || 0) / 2)
	mixedColor.b = Math.floor((colors[ 0 ].b || 0 + colors[ 1 ].b || 0) / 2)
	mixedColor.a = (colors[ 0 ].a + colors[ 1 ].a) / 2

	return [ mixedColor, mixedColor ]
}

const maybeSwitcherooColors = ({ colors, origin }) => {
	const xMod = origin[ 0 ] % 4
	const yMod = origin[ 1 ] % 4
	if (
		(xMod === 1 && yMod === 1) ||
		(xMod === 3 && yMod === 3) ||
		(xMod === 2 && yMod === 0) ||
		(xMod === 0 && yMod === 2)
	) {
		return colors.reverse()
	}

	return colors
}

// const isOnCanvas = ({ center, sizedUnit }) => {
// 	let vertices = calculateSquare({ center, sizedUnit })
//
// 	const { canvasSize, gridRotationAboutCenter } = state.shared
// 	const canvasCenter = [ canvasSize / 2, canvasSize / 2]
//
// 	if (state.shared.gridRotationAboutCenter) {
// 		vertices = rotateCoordinatesAboutPoint({
// 			point: canvasCenter,
// 			coordinates: vertices,
// 			rotation: gridRotationAboutCenter
// 		})
// 	}
//
// 	return vertices.some(pointIsOnCanvas)
//
// 	// it's way more complex than this, though...
// 	// need to handle the cases when:
// 	// 1. all vertices are off, but an edge is still on
// 	// 2. this one tile takes up the entire canvas (but all its edges and vertices are off)
// }

// const pointIsOnCanvas = point => {
// 	const canvasSize = state.shared.canvasSize
// 	return point[0] >= 0 && point[0] < canvasSize && point[1] >= 0 && point[1] < canvasSize
// }

const colorsAreTheSame = ({ colors }) => {
	const colorOne = colors[ 0 ]
	const colorTwo = colors[ 1 ]
	if (colorOne.r !== colorTwo.r) return false
	if (colorOne.g !== colorTwo.g) return false
	if (colorOne.b !== colorTwo.b) return false
	if (colorOne.a !== colorTwo.a) return false
	return true
}

const calculateOriginAndCenter = ({ initialOrigin: origin, initialCenter: center, scaleFromGridCenter, sizedUnit }) => {
	const { tileSize, offsetOrigin } = state.shared

	if (center) {
		center = scalePoint({ point: center, scaleFromGridCenter })
		origin = [
			center[ 0 ] - sizedUnit / 2,
			center[ 1 ] - sizedUnit / 2
		]
	} else if (origin) {
		origin = [ origin[ 0 ] * tileSize, origin[ 1 ] * tileSize ]
		origin = scalePoint({ point: origin, scaleFromGridCenter })
		center = [
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit / 2
		]
	} else {
		console.log('neither origin nor center provided!')
	}

	if (offsetOrigin) {
		origin[ 0 ] += offsetOrigin[ 0 ]
		origin[ 1 ] += offsetOrigin[ 1 ]
		center[ 0 ] += offsetOrigin[ 0 ]
		center[ 1 ] += offsetOrigin[ 1 ]
	}

	return { origin, center }
}

const supertileEntry = ({ supertile, origin }) => {
	const { supertileOffset } = state.shared.colors.colorAssignment
	const supertileWidth = supertile.length
	const supertileHeight = supertile[ 0 ].length
	let x = origin[ 0 ] + supertileOffset[ 0 ]
	let y = origin[ 1 ] + supertileOffset[ 1 ]
	while (x < 0) x += supertileWidth
	while (y < 0) y += supertileHeight
	return supertile[ x % supertileWidth ][ y % supertileHeight ]
}

const calculateColors = ({ origin, colors }) => {
	const { stripeCount, colors: stateColors } = state.shared
	const { opacity, colorAssignment: { flipGrain, switcheroo } } = stateColors
	const { ginghamMode, ginghamChevronContinuum } = stripeCount

	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? convertSquareTypeToColors({ squareType: entry }) : entry.slice()
	}

	colors = flipGrain ? colors.reverse() : colors
	colors = ginghamMode ? mixColors({ colors }) : colors
	colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors
	colors = ginghamChevronContinuum.on ? maybeRealignColors({ colors, origin }) : colors

	if (opacity < 1) {
		let newColors = [ Object.assign({}, colors[ 0 ]), Object.assign({}, colors[ 1 ]) ]
		newColors[ 0 ].a = colors[ 0 ].a * opacity
		newColors[ 1 ].a = colors[ 1 ].a * opacity
		colors = newColors
	}

	return colors
}

const calculateStripes = ({ stripeCount }) => iterator(stripeCount).map(stripeIndex => {
	const stripeStyle = state.shared.stripeStyle

	let stripe
	if (stripeStyle === 'DERASTERIZED_BY_AREA') {
		stripe = calculateDerasterizedByAreaStripe({ stripeCount, stripeIndex })
	} else if (stripeStyle === 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID') {
		stripe = calculateHarmonicContinuumSegmentStripe({ stripeCount, stripeIndex })
	} else if (stripeStyle === 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE') {
		stripe = calculateHarmonicContinuumStripe({ stripeCount, stripeIndex })
	} else if (stripeStyle === 'STANDARD') {
		stripe = stripeIndex / stripeCount
	} else {
		console.log('stripe style not set!')
	}

	return stripe * PERIMETER_SCALAR
})

const calculateSupertile = () => state.shared.colors.gongramColors ? GONGRAM_SUPERTILE : STANDARD_SUPERTILE

export default ({
					origin: initialOrigin,
					center: initialCenter,
					size,
					colors,
					scaleFromGridCenter,
					rotationAboutCenter
				}) => {
	const { unit, tileSize, stripeCount: stateStripeCount } = state.shared

	size = size || tileSize
	const sizedUnit = size * unit

	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	// if (!isOnCanvas({ center, sizedUnit })) return

	colors = calculateColors({ origin: initialOrigin, colors })

	if (colorsAreTheSame({ colors })) {
		const color = colors[ 0 ]
		if (color.a === 0) return
		drawSquare({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			color
		})
	} else {
		let stripes
		let stripeCount = stateStripeCount.baseCount
		if (stateStripeCount.ginghamChevronContinuum.on) {
			stripes = calculateGinghamChevronContinuumStripes({ origin: initialOrigin })
		}
		stripes = stripes || calculateStripes({ stripeCount })

		drawStripes({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			colors,
			stripes
		})
	}
}
