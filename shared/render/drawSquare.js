import render from './render'
import maybeRotateCoordinates from '../utilities/maybeRotateCoordinates'
import calculateSquare from '../utilities/calculateSquare'

export default ({ sizedUnit, center, origin, rotationAboutCenter, rotationAboutOrigin, color }) => {
    let coordinates = calculateSquare({ center, sizedUnit })
    coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin })
    render({ color, coordinates })
}