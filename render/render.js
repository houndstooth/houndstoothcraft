import colorUtilities from '../utilities/colorUtilities'
import shapesForElm from './shapesForElm'

export default ({ shapeColor, coordinates }) => {
	if (!coordinates.length) return

	const fill = colorUtilities.parseColor({ color: shapeColor })

	const points = coordinates.map(coordinate => coordinate.toString()).join(" ")

	shapesForElm.shapes.push({ fill, points })
}
