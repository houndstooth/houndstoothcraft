import controls from './controls'
import insertElementRightAfter from './insertElementRightAfter'

let warnings = document.querySelector('.warnings')

if (!warnings) {
	warnings = document.createElement('div')
	warnings.classList.add('warnings')
	insertElementRightAfter(warnings, controls)
}

export default warnings
