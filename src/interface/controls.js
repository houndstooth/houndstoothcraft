import canvas from './canvas'
import insertElementRightAfter from './insertElementRightAfter'

let controls = document.querySelector('.controls')

if (!controls) {
	controls = document.createElement('div')
	controls.classList.add('controls')
	insertElementRightAfter(controls, canvas)
}

export default controls
