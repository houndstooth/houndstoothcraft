import render from './render'
import { UNIT } from '../common/customize'

export default ({ origin, size, originColor, otherColor }) => {
	const sizedUnit = size * UNIT

	const topLeftTriangleCoordinates = [
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

	const topLeftTrapezoidCoordinates = [
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

	const bottomRightTrapezoidCoordinates = [
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

	const bottomRightTriangleCoordinates = [
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

	render({ color: originColor, coordinates: topLeftTriangleCoordinates })
	render({ color: otherColor, coordinates: topLeftTrapezoidCoordinates })
	render({ color: originColor, coordinates: bottomRightTrapezoidCoordinates })
	render({ color: otherColor, coordinates: bottomRightTriangleCoordinates })
}