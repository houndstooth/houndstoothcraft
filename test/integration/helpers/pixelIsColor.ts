import Canvas from '../../../src/page/types/Canvas'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'
import { console } from '../../../src/utilities/windowWrapper'
import isCloseTo from '../../helpers/isCloseTo'

const pixelIsColor: {
	(coordinateUnderTest: Coordinate, expectedColor: Color): boolean,
} = (coordinateUnderTest, expectedColor) => {
	const actualColor = pixel(coordinateUnderTest)

	if (actualColor.a === 0 && actualColor.a === expectedColor.a) {
		return true
	}

	for (let i = 0; i < Object.keys(actualColor).length; i++) {
		if (!checkColorProperties({ i, actualColor, expectedColor })) {
			return false
		}
	}

	return true
}

const pixel: { (coordinate: Coordinate): Color } = ([ x, y ]) => {
	const mixedDownCanvas = document.querySelector('.mixed-down-canvas') as Canvas
	const pixelData = mixedDownCanvas.getContext('2d').getImageData(x as any, y as any, 1, 1).data

	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255,
	}
}

const checkColorProperties: {
	({}: { actualColor: Color, expectedColor: Color, i: number }): boolean,
} = ({ actualColor, expectedColor, i }) => {
	const firstColorProperty = Object.entries(actualColor)[ i ]

	let definedFirstColorProperty: [ string, number | undefined ]
	if (!firstColorProperty) {
		return false
	}
	else {
		definedFirstColorProperty = firstColorProperty
	}

	let firstColorPropertyValue: number
	const definedFirstColorPropertyValue = definedFirstColorProperty[ 1 ]
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

	const firstColorPropertyKey = firstColorProperty[ 0 ]
	const secondColorPropertyValue = expectedColor[ firstColorPropertyKey ]

	if (!isCloseTo(firstColorPropertyValue, secondColorPropertyValue)) {
		console.error(`actual color: ${actualColor} / expected color ${expectedColor}`)

		return false
	}

	return true
}

export default pixelIsColor
