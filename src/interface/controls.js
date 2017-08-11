import canvas from './canvas'
import interfaceUtilities from '../utilities/interfaceUtilities'

let controls = document.querySelector('.controls')

if (!controls) {
	controls = document.createElement('div')
	controls.classList.add('controls')
	interfaceUtilities.insertElementRightAfter(controls, canvas)
}

export default controls
