import cmyktooth from '../../cmyktooth/cmyktooth'
import currentIteration from './currentIteration'

export default {
    shared: {
        tileSize: p => p / Math.sqrt(2),
        colorA: () => {
            currentIteration.currentIteration++
            const { getCmyktoothColor } = cmyktooth
            return getCmyktoothColor(currentIteration.currentIteration % 4)
        },
        gridRotationAboutCenter: p => p + (Math.PI / 4),
        opacity: () => 1 / (currentIteration.currentIteration + 1),
        offsetOrigin: () => {
            const { CMYKTOOTH_SIZE } = cmyktooth
            const tileSize = CMYKTOOTH_SIZE / Math.pow(2, 1 + currentIteration.currentIteration / 2)
            return [ (CMYKTOOTH_SIZE / 2) - tileSize , (CMYKTOOTH_SIZE / 2) - tileSize ]
        }  
    }
}
