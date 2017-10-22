import { Color } from '../../../render'
import { ColorAssignmentSettings } from './color'

interface ColorSettings {
	backgroundColor: Color,
	colorAssignment: Partial<ColorAssignmentSettings>,
	colorSet: Color[],
	opacity: number,
}

export { ColorSettings }
