import state from '../../state'
import { CENTER } from '../constants'
import rotateCoordinatesAboutPoint from './rotateCoordinatesAboutPoint'
import calculateSquare from './calculateSquare'

export default ({ center, sizedUnit }) => {
    let vertices = calculateSquare({ center, sizedUnit })

    if (state.shared.gridRotationAboutCenter) {
        vertices = rotateCoordinatesAboutPoint({
            point: CENTER,
            coordinates: vertices,
            rotation: state.shared.gridRotationAboutCenter
        })
    }

    return vertices.some(pointIsOnCanvas)

    // it's way more complex than this, though...
    // need to handle the cases when:
    // 1. all vertices are off, but an edge is still on
    // 2. this one tile takes up the entire canvas (but all its edges and vertices are off)
}


const pointIsOnCanvas = point => {
    const canvasSize = state.shared.canvasSize
    return point[0] >= 0 && point[0] < canvasSize && point[1] >= 0 && point[1] < canvasSize
}