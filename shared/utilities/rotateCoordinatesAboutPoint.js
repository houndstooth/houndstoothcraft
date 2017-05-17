import rotateCoordinateAboutPoint from './rotateCoordinateAboutPoint'

export default ({ coordinates, point, rotation }) => {
	return coordinates.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}
