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
import convertTileTypeToColors from '../utilities/convertTileTypeToColors'
import iterator from '../utilities/iterator'
import rotateCoordinateAboutPoint from '../utilities/rotateCoordinateAboutPoint'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import calculateHoundazzleSolidTileSubstripeCoordinates from '../../houndazzle/calculateHoundazzleSolidTileSubstripeCoordinates'
import calculateSubstripeStripeUnionCoordinates from '../../houndazzle/calculateSubstripeStripeUnionCoordinates'
// import isOnCanvas from '../utilities/isOnCanvas'

const PERIMETER_SCALAR = 2

const calculateSquareCoordinates = ({ center, sizedUnit }) => {
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

const drawShape = ({
					   substripeUnit,
					   stripeUnit,
					   underlyingColor,
					   substripeIndex,
					   colors,
					   currentPositionAlongPerimeter,
					   sizedUnit,
					   stripeIndex,
					   center,
					   origin,
					   rotationAboutCenter,
					   coordinatesFunction,
					   nextPositionAlongPerimeter
				   }) => {
	const color = calculateColor({ colors, stripeIndex, substripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({
		currentPositionAlongPerimeter,
		nextPositionAlongPerimeter,
		sizedUnit,
		origin,
		center,
		substripeUnit,
		stripeUnit,
		underlyingColor,
		substripeIndex,
		stripeIndex
	})
	if (!coordinates) return

	coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })
	render({ color, coordinates })
}

const colorsAreTheSameHue = ({ colorOne, colorTwo }) => {
	if (colorOne.r !== colorTwo.r) return false
	if (colorOne.g !== colorTwo.g) return false
	if (colorOne.b !== colorTwo.b) return false
	return true
}

const drawStripes = ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes, stripeCount }) => {
	const { substripeCount } = state.shared.colors.houndazzle
	const substripeUnit = sizedUnit / substripeCount
	const stripeUnit = sizedUnit * 2 / stripeCount

	const colorOne = calculateColor({ colors, stripeIndex: 0 })
	const colorTwo = state.shared.colors.colorA
	const underlyingColor = colorsAreTheSameHue({ colorOne, colorTwo }) ? 0 : 1

	stripes.forEach((currentPositionAlongPerimeter, stripeIndex) => {
		const nextPositionAlongPerimeter = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.colors.houndazzle.on) {
			iterator(substripeCount).forEach(substripeIndex => {
				drawShape({
					colors,
					currentPositionAlongPerimeter,
					sizedUnit,
					stripeIndex,
					center,
					origin,
					rotationAboutCenter,
					coordinatesFunction: calculateSubstripeStripeUnionCoordinates,
					substripeUnit,
					stripeUnit,
					underlyingColor,
					substripeIndex,
					nextPositionAlongPerimeter
				})
			})
		} else {
			drawShape({
				colors,
				currentPositionAlongPerimeter,
				sizedUnit,
				stripeIndex,
				center,
				origin,
				rotationAboutCenter,
				coordinatesFunction: calculateStripeCoordinates,
				nextPositionAlongPerimeter
			})
		}
	})
}

const calculateStripeCoordinates = ({ currentPositionAlongPerimeter, nextPositionAlongPerimeter, sizedUnit, origin }) => {
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

const fadeColors = ({ colors }) => {
	const { opacity } = state.shared.colors
	let newColors = [ Object.assign({}, colors[ 0 ]), Object.assign({}, colors[ 1 ]) ]
	newColors[ 0 ].a = colors[ 0 ].a * opacity
	newColors[ 1 ].a = colors[ 1 ].a * opacity
	return newColors
}

const drawSquare = ({ sizedUnit, center, origin, rotationAboutCenter, color }) => {
	const { colorA, colorB } = state.shared.colors
	const colors = fadeColors({ colors: [ colorA, colorB ] })

	const underlyingColor = colorsAreTheSameHue({ colorOne: color, colorTwo: colorB }) ? 1 : 0
	const { substripeCount } = state.shared.colors.houndazzle
	const substripeUnit = sizedUnit / substripeCount

	if (state.shared.colors.houndazzle.on) {
		iterator(substripeCount).forEach(substripeIndex => {
			drawShape({
				substripeUnit,
				substripeIndex,
				stripeIndex: underlyingColor,
				colors,
				origin,
				sizedUnit,
				rotationAboutCenter,
				underlyingColor,
				coordinatesFunction: calculateHoundazzleSolidTileSubstripeCoordinates
			})
		})
	} else {
		drawShape({
			colors: [ color, color ],
			center,
			sizedUnit,
			origin,
			rotationAboutCenter,
			coordinatesFunction: calculateSquareCoordinates
		})
	}
}

const mixColors = ({ colors }) => {
	let mixedColor = {}

	const firstR = colors[ 0 ].r || 0
	const firstG = colors[ 0 ].g || 0
	const firstB = colors[ 0 ].b || 0
	const secondR = colors[ 1 ].r || 0
	const secondG = colors[ 1 ].g || 0
	const secondB = colors[ 1 ].b || 0

	mixedColor.r = Math.floor((firstR + secondR) / 2)
	mixedColor.g = Math.floor((firstG + secondG) / 2)
	mixedColor.b = Math.floor((firstB + secondB) / 2)
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

const colorsAreTheSame = ({ colors }) => {
	const colorOne = colors[ 0 ]
	const colorTwo = colors[ 1 ]
	return colorOne.a === colorTwo.a && colorsAreTheSameHue({ colorOne, colorTwo })
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
		colors = typeof entry === 'string' ? convertTileTypeToColors({ tileType: entry }) : entry.slice()
	}

	colors = flipGrain ? colors.reverse() : colors
	colors = ginghamMode ? mixColors({ colors }) : colors
	colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors
	colors = ginghamChevronContinuum.on ? maybeRealignColors({ colors, origin }) : colors

	if (opacity < 1) colors = fadeColors({ colors })

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
		if (color.a === 0 && !state.shared.colors.houndazzle.on) return
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
			stripes,
			stripeCount
		})
	}
}
