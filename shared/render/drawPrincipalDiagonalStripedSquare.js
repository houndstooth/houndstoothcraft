import render from './render'
import { UNIT } from '../common/customize'
import scalePoint from '../utilities/scalePoint'

// THIS SHOULD NOW JUST BE ACCOMPLISHED BY ROTATING THE MINOR DIAGONAL VERSION

export default ({ origin, size, originColor, otherColor, scaleFromGridCenter }) => {
	origin = scalePoint({ point: origin, scaleFromGridCenter })
	const sizedUnit = size * UNIT

	const topRightTriangleCoordinates = [
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit / 2
		]
	]

	const topRightTrapezoidCoordinates = [
		[
			origin[ 0 ],
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit / 2
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ]
		]
	]

	const bottomLeftTrapezoidCoordinates = [
		[
			origin[ 0 ],
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ],
			origin[ 1 ] + sizedUnit / 2
		]
	]

	const bottomLeftTriangleCoordinates = [
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
			origin[ 1 ] + sizedUnit
		]
	]

	render({ color: originColor, coordinates: topRightTriangleCoordinates })
	render({ color: otherColor, coordinates: topRightTrapezoidCoordinates })
	render({ color: originColor, coordinates: bottomLeftTrapezoidCoordinates })
	render({ color: otherColor, coordinates: bottomLeftTriangleCoordinates })
}