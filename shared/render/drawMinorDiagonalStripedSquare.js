import render from './render'
import { UNIT } from '../common/customize'
import rotateCoordinates from '../utilities/rotateCoordinates'
import scaleOrigin from '../utilities/scaleOrigin'

export default ({ origin, size, originColor, otherColor, scaleFromCenter, rotation }) => {
	origin = scaleOrigin({ origin, scaleFromCenter })
	const sizedUnit = size * UNIT

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

	if (rotation) {
		topLeftTriangleCoordinates = rotateCoordinates({ origin, coordinates: topLeftTriangleCoordinates, rotation })
		topLeftTrapezoidCoordinates = rotateCoordinates({ origin, coordinates: topLeftTrapezoidCoordinates, rotation })
		bottomRightTrapezoidCoordinates = rotateCoordinates({ origin, coordinates: bottomRightTrapezoidCoordinates, rotation })
		bottomRightTriangleCoordinates = rotateCoordinates({ origin, coordinates: bottomRightTriangleCoordinates, rotation })
	}

	render({ color: originColor, coordinates: topLeftTriangleCoordinates })
	render({ color: otherColor, coordinates: topLeftTrapezoidCoordinates })
	render({ color: originColor, coordinates: bottomRightTrapezoidCoordinates })
	render({ color: otherColor, coordinates: bottomRightTriangleCoordinates })
}