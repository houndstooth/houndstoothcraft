import { ColorSet } from '../../../components'
import { Color } from '../../../render'
import { ColorAssignmentSettings } from './color'

interface ColorSettings {
	backgroundColor: Color,
	colorAssignment: Partial<ColorAssignmentSettings>,
	colorSet: ColorSet,
	opacity: number,
}

export { ColorSettings }
