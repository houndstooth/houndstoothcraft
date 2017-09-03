import isCloseTo from '../../helpers/isCloseTo'
import consoleWrapper from '../../../src/utilities/consoleWrapper'

export default (coordinateUnderTest, expectedColor) => {
	const actualColor = pixel(coordinateUnderTest)

	if (actualColor.a === 0 && actualColor.a === expectedColor.a) return true

	for (let i = 0; i < Object.keys(actualColor).length; i++) {
		const firstColorProperty = Object.entries(actualColor)[ i ]
		const firstColorPropertyValue = firstColorProperty[ 1 ]
		const firstColorPropertyKey = firstColorProperty[ 0 ]
		const secondColorPropertyValue = expectedColor[ firstColorPropertyKey ]
		if (!isCloseTo(firstColorPropertyValue, secondColorPropertyValue)) {
			consoleWrapper.error(`actual color: ${actualColor} / expected color ${expectedColor}`)
			return false
		}
	}

	return true
}

const pixel = ([ x, y ]) => {
	const mixedDownCanvas = document.querySelector('.mixed-down-canvas')
	const pixelData = mixedDownCanvas.getContext('2d').getImageData(x, y, 1, 1).data
	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255,
	}
}
