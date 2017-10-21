import { Color } from '../../../render'
import { Assignment } from './color'

interface ColorSettings {
	assignment: Partial<Assignment>,
	backgroundColor: Color,
	colorSet: Color[],
	opacity: number,
}

export { ColorSettings }
