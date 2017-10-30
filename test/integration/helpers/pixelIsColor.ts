import { Canvas } from '../../../src/page'
import { Color } from '../../../src/render'
import { parseColor } from '../../../src/render/parseColor'
import { Coordinate } from '../../../src/space'
import { console } from '../../../src/utilities/windowWrapper'
import { isCloseTo } from '../../helpers/isCloseTo'
import { buildMockCanvas } from '../../unit/helpers/buildMockCanvas'

const pixelIsColor: (coordinateUnderTest: Coordinate, expectedColor: Color) => boolean =
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

const pixelColor: (coordinate: Coordinate) => Color = ([ x, y ]: Coordinate): Color => {
	const mixedDownCanvas: Canvas = document.querySelector('.mixed-down-canvas') as HTMLCanvasElement || buildMockCanvas()
	// tslint:disable-next-line:no-unsafe-any
	const pixelData: Uint8ClampedArray = mixedDownCanvas.getContext('2d').getImageData(x, y, 1, 1).data

	return { r: pixelData[ 0 ], g: pixelData[ 1 ], b: pixelData[ 2 ], a: pixelData[ 3 ] / 255 }
}

type Key = [ string, number | undefined ]

interface CheckColorProperties {
	readonly actualColor: Color,
	readonly expectedColor: Color,
	readonly i: number,
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
			console.error(`actual color: ${parseColor(actualColor)} / expected color ${parseColor(expectedColor)}`)

			return false
		}

		return true
	}

export { pixelIsColor }
