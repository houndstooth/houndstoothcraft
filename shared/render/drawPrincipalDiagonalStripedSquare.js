import render from './render'
import { UNIT } from '../common/customize'
import scaleOrigin from '../utilities/scaleOrigin'

export default ({ origin, size, originColor, otherColor, scaleFromCenter }) => {
	origin = scaleOrigin({ origin, scaleFromCenter })
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