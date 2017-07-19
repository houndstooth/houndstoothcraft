import render from '../render/render'
import componentUtilities from '../utilities/componentUtilities'
import codeUtilities from '../utilities/codeUtilities'
import viewUtilities from '../utilities/viewUtilities'

export default ({ tileOrigin, tileSize, tileColors, colorsIndex, getCoordinates, coordinatesOptions }) => {
	const { zoomedAndScrolledTileOrigin, zoomedTileSize } = viewUtilities.applyZoomAndScroll({ tileOrigin, tileSize })

	const shapeColor = codeUtilities.wrappedIndex({ array: tileColors, index: colorsIndex })
	if (shapeColor.a === 0) return

	let coordinates = getCoordinates({ tileOrigin: zoomedAndScrolledTileOrigin, zoomedTileSize, coordinatesOptions })
	if (!coordinates) return
	coordinates = componentUtilities.rotateShapeAboutShapeCenter({ coordinates, zoomedAndScrolledTileOrigin, zoomedTileSize })
	coordinates = viewUtilities.rotateShapeAboutCanvasCenter({ coordinates })

	render({ shapeColor, coordinates })
}
