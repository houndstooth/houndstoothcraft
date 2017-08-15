import canvasContainer from './canvasContainer'
import interfaceUtilities from '../utilities/interfaceUtilities'

let controls = document.querySelector('.controls')

if (!controls) {
	controls = document.createElement('div')
	controls.classList.add('controls')
	interfaceUtilities.insertElementRightAfter(controls, canvasContainer)
}

export default controls
