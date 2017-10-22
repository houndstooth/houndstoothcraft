import { Color } from '../../../render'
import { ColorAssignment } from './color'

interface ColorSettings {
	backgroundColor: Color,
	colorAssignment: Partial<ColorAssignment>,
	colorSet: Color[],
	opacity: number,
}

export { ColorSettings }
