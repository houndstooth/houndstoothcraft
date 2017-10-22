import { Color } from '../../../render'
import { ColorAssignmentSettings } from './color'
import { ColorSet } from '../../../components'

interface ColorSettings {
	backgroundColor: Color,
	colorAssignment: Partial<ColorAssignmentSettings>,
	colorSet: ColorSet,
	opacity: number,
}

export { ColorSettings }
