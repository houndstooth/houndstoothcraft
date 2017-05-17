import render from './render'
import { UNIT, STRIPE_ROTATION, BASE_STRIPE_DIAGONAL } from '../common/customize'
import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET } from '../common/constants'
import rotateCoordinatesAboutPoint from '../utilities/rotateCoordinatesAboutPoint'
import scalePoint from '../utilities/scalePoint'

export default ({ origin, center, size, originColor, otherColor, scaleFromGridCenter, rotationAboutCenter, rotationAboutOrigin }) => {
	const sizedUnit = size * UNIT
	if (origin) {
		origin = scalePoint({ point: origin, scaleFromGridCenter })
		center = [
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit / 2
		]
	} else if (center) {
		center = scalePoint({ point: center, scaleFromGridCenter })
		origin = [
			center[ 0 ] - sizedUnit / 2,
			center[ 1 ] - sizedUnit / 2
		]
	} else {
		console.log('neither origin nor center provided!')
	}

	let topLeftTriangleCoordinates = [
		[
			origin[ 0 ],
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ]
		],
		[
			origin[ 0 ],
			origin[ 1 ] + sizedUnit / 2
		]
	]

	let topLeftTrapezoidCoordinates = [
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ]
		],
		[
			origin[ 0 ],
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ],
			origin[ 1 ] + sizedUnit / 2
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ]
		]
	]

	let bottomRightTrapezoidCoordinates = [
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit / 2
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ],
			origin[ 1 ] + sizedUnit
		]
	]

	let bottomRightTriangleCoordinates = [
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit / 2
		]
	]

	if (rotationAboutCenter) {
		topLeftTriangleCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: topLeftTriangleCoordinates, rotation: rotationAboutCenter })
		topLeftTrapezoidCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: topLeftTrapezoidCoordinates, rotation: rotationAboutCenter })
		bottomRightTrapezoidCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: bottomRightTrapezoidCoordinates, rotation: rotationAboutCenter })
		bottomRightTriangleCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: bottomRightTriangleCoordinates, rotation: rotationAboutCenter })
	}

	if (rotationAboutOrigin) {
		topLeftTriangleCoordinates = rotateCoordinatesAboutPoint({ point: origin, coordinates: topLeftTriangleCoordinates, rotation: rotationAboutOrigin })
		topLeftTrapezoidCoordinates = rotateCoordinatesAboutPoint({ point: origin, coordinates: topLeftTrapezoidCoordinates, rotation: rotationAboutOrigin })
		bottomRightTrapezoidCoordinates = rotateCoordinatesAboutPoint({ point: origin, coordinates: bottomRightTrapezoidCoordinates, rotation: rotationAboutOrigin })
		bottomRightTriangleCoordinates = rotateCoordinatesAboutPoint({ point: origin, coordinates: bottomRightTriangleCoordinates, rotation: rotationAboutOrigin })
	}

	const offset = BASE_STRIPE_DIAGONAL === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
	const extraRotation = offset + STRIPE_ROTATION
	if (extraRotation !== 0) {
		topLeftTriangleCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: topLeftTriangleCoordinates, rotation: extraRotation })
		topLeftTrapezoidCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: topLeftTrapezoidCoordinates, rotation: extraRotation })
		bottomRightTrapezoidCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: bottomRightTrapezoidCoordinates, rotation: extraRotation })
		bottomRightTriangleCoordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: bottomRightTriangleCoordinates, rotation: extraRotation })
	}

	render({ color: originColor, coordinates: topLeftTriangleCoordinates })
	render({ color: otherColor, coordinates: topLeftTrapezoidCoordinates })
	render({ color: originColor, coordinates: bottomRightTrapezoidCoordinates })
	render({ color: otherColor, coordinates: bottomRightTriangleCoordinates })
}