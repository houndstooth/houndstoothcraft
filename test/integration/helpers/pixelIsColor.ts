import { Color, Coordinate, from, parseColor } from '../../../src/indexForTest'
import { isCloseTo } from '../../helpers'

import { CheckColorProperties, Key, PixelIsColor } from './types'

const pixelIsColor: PixelIsColor =
	(coordinateUnderTest: Coordinate, expectedColor: Color): boolean => {
		const actualColor: Color = pixelColor(coordinateUnderTest)

		if (actualColor.a === 0 && actualColor.a === expectedColor.a) {
			return true
		}

		for (let i: number = 0; i < Object.keys(actualColor).length; i++) {
			if (!checkColorProperties({ i, actualColor, expectedColor })) {
				return false
			}
		}

		return true
	}

const pixelColor: (_: Coordinate) => Color = ([ x, y ]: Coordinate): Color => {
	// tslint:disable-next-line:max-line-length
	const mixedDownCanvas: HTMLCanvasElement = document.querySelector('#mixed-down-canvas') as HTMLCanvasElement
	// tslint:disable-next-line:no-unsafe-any
	const mixedDownContext: CanvasRenderingContext2D = mixedDownCanvas.getContext('2d') as CanvasRenderingContext2D
	const pixelData: Uint8ClampedArray = mixedDownContext.getImageData(from.Unit(x), from.Unit(y), 1, 1).data

	return { r: pixelData[ 0 ], g: pixelData[ 1 ], b: pixelData[ 2 ], a: pixelData[ 3 ] / 255 }
}

const checkColorProperties: (_: CheckColorProperties) => boolean =
	({ actualColor, expectedColor, i }: CheckColorProperties): boolean => {
		const firstColorProperty: Key = Object.entries(actualColor)[ i ]

		let definedFirstColorProperty: Key
		if (!firstColorProperty) {
			return false
		}
		else {
			definedFirstColorProperty = firstColorProperty
		}

		let firstColorPropertyValue: number
		const definedFirstColorPropertyValue: number | undefined = definedFirstColorProperty[ 1 ]
		if (!definedFirstColorPropertyValue) {
			if (definedFirstColorPropertyValue === 0) {
				firstColorPropertyValue = definedFirstColorPropertyValue
			}
			else {
				return false
			}
		}
		else {
			firstColorPropertyValue = definedFirstColorPropertyValue
		}

		const firstColorPropertyKey: string = firstColorProperty[ 0 ]
		const secondColorPropertyValue: number | undefined = expectedColor[ firstColorPropertyKey ]

		if (secondColorPropertyValue && !isCloseTo(firstColorPropertyValue, secondColorPropertyValue)) {
			const parsedActualColor: string = parseColor.default(actualColor)
			const parsedExpectedColor: string = parseColor.default(expectedColor)
			const error: string = `actual color: ${parsedActualColor} / expected color ${parsedExpectedColor}`
			fail(error)

			return false
		}

		return true
	}

export default pixelIsColor
